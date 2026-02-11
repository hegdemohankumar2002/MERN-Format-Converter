import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../App.css";
import { useAuth } from "../../context/AuthContext";

const HEICToJPG = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadData, setDownloadData] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [quota, setQuota] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePreviews, setFilePreviews] = useState([]);
  const [totalFileSize, setTotalFileSize] = useState(0);
  const inputRef = useRef();
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`;
  const { token } = useAuth();

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const MAX_TOTAL_SIZE = 200 * 1024 * 1024; // 200MB

  const fetchQuota = useCallback(async () => {
    try {
      console.log("Token in HEICToJPG:", token);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      console.log("Headers being sent:", headers);
      const res = await axios.get(`${backendBaseUrl}/api/quota`, { headers });
      setQuota(res.data);
    } catch (err) {
      console.error("Quota fetch error:", err);
      setQuota(null);
    }
  }, [token, backendBaseUrl]);

  useEffect(() => {
    fetchQuota();
  }, [fetchQuota]); // Add token dependency to refetch when token changes

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const createFilePreview = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          name: file.name,
          size: file.size,
          preview: e.target.result,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (fileList) => {
    const heicFiles = Array.from(fileList).filter(f => 
      f.name.toLowerCase().endsWith('.heic') || f.name.toLowerCase().endsWith('.heif')
    );

    if (heicFiles.length === 0) {
      toast.error("❌ Please select HEIC/HEIF files only.");
      return;
    }

    // Check file sizes
    const oversizedFiles = heicFiles.filter(f => f.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error(`❌ Files too large: ${oversizedFiles.map(f => f.name).join(', ')}. Max size is ${formatFileSize(MAX_FILE_SIZE)}.`);
      return;
    }

    const totalSize = heicFiles.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      toast.error(`❌ Total file size (${formatFileSize(totalSize)}) exceeds limit (${formatFileSize(MAX_TOTAL_SIZE)}).`);
      return;
    }

    setTotalFileSize(totalSize);
    setFiles(heicFiles);

    // Create previews
    const previews = await Promise.all(heicFiles.map(createFilePreview));
    setFilePreviews(previews);
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
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = filePreviews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setFilePreviews(newPreviews);
    setTotalFileSize(newFiles.reduce((sum, f) => sum + f.size, 0));
  };

  const handleUpload = async () => {
    if (!files.length) {
      toast.error("❌ Please select at least one HEIC file to convert.");
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
    setUploadProgress(0);
    
    try {
      const res = await axios.post(
        `${backendBaseUrl}/api/convert`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        }
      );
      setDownloadData(res.data);
      toast.success("✅ Conversion successful!");
      fetchQuota();
    } catch (err) {
      if (err.response && err.response.status === 403) {
        await fetchQuota();
        toast.error("You have reached your free conversion limit. Please register or log in for unlimited conversions.");
      } else {
        await fetchQuota();
        toast.error(err.response?.data?.message || "❌ Conversion failed! Please try again.");
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="neon-card" style={{ maxWidth: 600, margin: "2.5rem auto", position: "relative" }}>
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
      
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span className="text-neon" style={{ fontSize: 44, display: "block", marginBottom: 8 }}>🌄</span>
        <h2 style={{ marginBottom: 6 }}>HEIC to JPG</h2>
        <p style={{ color: "#b3b3ff", marginBottom: 18 }}>Convert your HEIC images to high-quality JPGs in seconds.</p>
        
        {/* File size limits info */}
        <div style={{
          background: "var(--color-card)",
          border: "1px solid var(--color-border)",
          borderRadius: 8,
          padding: "0.5rem 1rem",
          marginBottom: 16,
          fontSize: 14,
          color: "var(--color-text-muted)"
        }}>
          📏 Max file size: {formatFileSize(MAX_FILE_SIZE)} | Max total size: {formatFileSize(MAX_TOTAL_SIZE)}
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div
        className={"neon-card" + (dragActive ? " glow" : "")}
        style={{
          background: dragActive ? "#23234d" : "#23234d99",
          border: dragActive ? "2px solid var(--color-accent)" : "1.5px solid var(--color-primary)",
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
          transition: "border 0.2s, background 0.2s",
          position: "relative"
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
          accept=".heic,.heif"
          style={{ display: "none" }}
          onChange={e => handleFiles(e.target.files)}
        />
        <span style={{ fontSize: 32, color: "var(--color-accent)", marginBottom: 8 }}>📂</span>
        <span style={{ color: dragActive ? "var(--color-accent)" : "#b3b3ff", textAlign: "center" }}>
          {dragActive ? "Drop files here!" : "Drag & drop HEIC files or click to select"}
        </span>
        <span style={{ fontSize: 12, color: "var(--color-text-muted)", marginTop: 8 }}>
          Supports .heic and .heif files
        </span>
      </div>

      {/* File Previews */}
      {filePreviews.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <strong style={{ color: "var(--color-accent)" }}>
              Selected files ({files.length}): {formatFileSize(totalFileSize)}
            </strong>
            <button
              onClick={() => {
                setFiles([]);
                setFilePreviews([]);
                setTotalFileSize(0);
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-error)",
                cursor: "pointer",
                fontSize: 14,
                padding: "4px 8px",
                borderRadius: 4
              }}
            >
              Clear all
            </button>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {filePreviews.map((preview, index) => (
              <div
                key={index}
                style={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  padding: 12,
                  position: "relative"
                }}
              >
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    background: "var(--color-error)",
                    border: "none",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    color: "white",
                    cursor: "pointer",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  ×
                </button>
                
                <div style={{ textAlign: "center", marginBottom: 8 }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    background: "var(--color-bg-alt)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                    fontSize: 24
                  }}>
                    🖼️
                  </div>
                  <div style={{ fontSize: 12, color: "var(--color-text)", fontWeight: 600, wordBreak: "break-word" }}>
                    {preview.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
                    {formatFileSize(preview.size)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {loading && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "var(--color-text)", fontSize: 14 }}>Converting...</span>
            <span style={{ color: "var(--color-accent)", fontSize: 14 }}>{uploadProgress}%</span>
          </div>
          <div style={{
            width: "100%",
            height: 8,
            background: "var(--color-border)",
            borderRadius: 4,
            overflow: "hidden"
          }}>
            <div style={{
              width: `${uploadProgress}%`,
              height: "100%",
              background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
              transition: "width 0.3s ease"
            }} />
          </div>
        </div>
      )}

      <button 
        className="neon-btn" 
        onClick={handleUpload} 
        disabled={loading || files.length === 0}
        style={{ 
          width: "100%", 
          marginBottom: 18,
          opacity: files.length === 0 ? 0.5 : 1
        }}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="neon-loader" style={{ marginRight: 8 }} />
            Converting...
          </span>
        ) : (
          `Convert ${files.length} file${files.length !== 1 ? 's' : ''}`
        )}
      </button>

      {downloadData && (
        <div style={{ textAlign: "center" }}>
          {downloadData.directDownloadUrl && files.length === 1 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
              <a
                href={`${process.env.REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`}${downloadData.directDownloadUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn"
                style={{ 
                  display: "block",
                  background: "linear-gradient(90deg, var(--color-accent), var(--color-primary))"
                }}
              >
                ⬇ Download {downloadData.fileName}
              </a>
              <a
                href={`${process.env.REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`}${downloadData.downloadUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn"
                style={{ 
                  display: "block",
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)"
                }}
              >
                📦 Download as ZIP
              </a>
            </div>
          ) : (
            <a
              href={`${process.env.REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`}${downloadData.downloadUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn"
              style={{ 
                display: "inline-block",
                background: "linear-gradient(90deg, var(--color-accent), var(--color-primary))",
                marginBottom: 12
              }}
            >
              ⬇ Download Converted Files
            </a>
          )}
          <button
            onClick={() => {
              setFiles([]);
              setFilePreviews([]);
              setTotalFileSize(0);
              setDownloadData(null);
            }}
            style={{
              background: "none",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              padding: "8px 16px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 14
            }}
          >
            Convert More Files
          </button>
        </div>
      )}
    </div>
  );
};

export default HEICToJPG;
