import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../App.css";
import { useAuth } from "../../context/AuthContext";

const JPGToSVG = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();
  const [quota, setQuota] = useState(null);
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`;
  const { token } = useAuth();

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList).filter(f => /\.(jpg|jpeg)$/i.test(f.name));
    setFiles(arr);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragleover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const fetchQuota = useCallback(async () => {
    try {
      const res = await axios.get(`${backendBaseUrl}/api/quota`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      setQuota(res.data);
    } catch (err) {
      setQuota(null);
    }
  }, [token, backendBaseUrl]);

  useEffect(() => {
    fetchQuota();
  }, [fetchQuota]);

  const handleUpload = async () => {
    if (!files.length) {
      toast.warn("❌ Please select at least one JPG file to convert.");
      return;
    }
    if (quota && quota.type === "guest" && quota.remaining <= 0) {
      toast.error("You have reached your free conversion limit. Please register or log in for unlimited conversions.");
      return;
    }
    const formData = new FormData();
    for (let f of files) {
      formData.append("images", f);
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendBaseUrl}/api/convert`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        }
      );
      setDownloadLink(res.data.downloadUrl);
      toast.success("Conversion successful!");
      fetchQuota();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        await fetchQuota();
        toast.error("You have reached your free conversion limit. Please register or log in for unlimited conversions.");
      } else {
        await fetchQuota();
        toast.error("Conversion failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neon-card" style={{ maxWidth: 420, margin: "2.5rem auto", position: "relative" }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span className="text-neon" style={{ fontSize: 44, display: "block", marginBottom: 8, textShadow: 'none' }}>🎨</span>
        <h2 className="text-neon" style={{ marginBottom: 6, textShadow: 'none' }}>JPG to SVG</h2>
        <p style={{ color: "#b3b3ff", marginBottom: 18 }}>Convert JPG images to SVG vector graphics.</p>
      </div>
      {/* Quota info banner */}
      {quota && quota.type === "guest" && (
        <div style={{
          background: "#ffe06622",
          color: "#b37d00",
          borderRadius: 8,
          padding: "0.7rem 1rem",
          marginBottom: 16,
          fontWeight: 500,
          fontSize: 15,
          textAlign: "center"
        }}>
          {quota.remaining > 0 ? (
            <>You have <b>{quota.remaining}</b> free conversions left. Register or log in for unlimited conversions.</>
          ) : (
            <><b>You have reached your free conversion limit.</b> Please register or log in for unlimited conversions.</>
          )}
        </div>
      )}
      <div
        className={"neon-card" + (dragActive ? " glow" : "")}
        style={{
          background: dragActive ? "#23234d" : "#23234dbb",
          border: dragActive ? "1.5px solid var(--color-accent)" : "1px solid var(--color-primary)",
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
          transition: "border 0.2s, background 0.2s",
          boxShadow: dragActive ? "0 0 12px 2px #00eaff55" : "0 0 8px 1px #7f5cff33"
        }}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg"
          style={{ display: "none" }}
          onChange={e => handleFiles(e.target.files)}
        />
        <span style={{ fontSize: 32, color: "var(--color-accent)", marginBottom: 8 }}>📂</span>
        <span style={{ color: dragActive ? "var(--color-accent)" : "#b3b3ff" }}>
          {dragActive ? "Drop files here!" : "Drag & drop JPG files or click to select"}
        </span>
      </div>
      {files.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <strong style={{ color: "var(--color-accent)" }}>Selected files:</strong>
          <ul style={{ color: "#b3b3ff", fontSize: 15, margin: "8px 0 0 0", paddingLeft: 18 }}>
            {files.map((f, i) => <li key={i}>{f.name}</li>)}
          </ul>
        </div>
      )}
      <button className="neon-btn" onClick={handleUpload} disabled={loading} style={{ width: "100%", marginBottom: 18 }}>
        {loading ? <span className="neon-loader" style={{ display: "inline-block", verticalAlign: "middle" }} /> : "Convert"}
      </button>
      {downloadLink && (
        <a
          href={`${backendBaseUrl}${downloadLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="neon-btn"
          style={{ display: "block", textAlign: "center", margin: "0 auto", background: "linear-gradient(90deg, var(--color-accent), var(--color-primary))" }}
        >
          ⬇ Download Converted Files
        </a>
      )}
    </div>
  );
};

export default JPGToSVG;
