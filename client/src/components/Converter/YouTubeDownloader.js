import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../App.css";
import { useAuth } from "../../context/AuthContext";

const YouTubeDownloader = () => {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("best");
  const [loading, setLoading] = useState(false);
  const [downloadData, setDownloadData] = useState(null);
  const [quota, setQuota] = useState(null);
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`;
  const { token } = useAuth();

  // Quality options for YouTube downloads
  const qualityOptions = [
    { value: "best", label: "Best Quality (Auto)" },
    { value: "worst", label: "Worst Quality (Auto)" },
    { value: "bestvideo[height<=144]+bestaudio/best[height<=144]", label: "144p" },
    { value: "bestvideo[height<=240]+bestaudio/best[height<=240]", label: "240p" },
    { value: "bestvideo[height<=360]+bestaudio/best[height<=360]", label: "360p" },
    { value: "bestvideo[height<=480]+bestaudio/best[height<=480]", label: "480p" },
    { value: "bestvideo[height<=720]+bestaudio/best[height<=720]", label: "720p" },
    { value: "bestvideo[height<=1080]+bestaudio/best[height<=1080]", label: "1080p" },
    { value: "bestvideo[height<=1440]+bestaudio/best[height<=1440]", label: "1440p (2K)" },
    { value: "bestvideo[height<=2160]+bestaudio/best[height<=2160]", label: "2160p (4K)" },
  ];

  const fetchQuota = useCallback(async () => {
    try {
      console.log("Token in YouTubeDownloader:", token);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      console.log("Headers being sent:", headers);
      const res = await axios.get(`${backendBaseUrl}/api/quota`, { headers });
      setQuota(res.data);
    } catch (err) {
      console.error("Quota fetch error:", err);
      setQuota(null);
    }
  }, [backendBaseUrl, token]);

  useEffect(() => {
    fetchQuota();
  }, [fetchQuota]);

  const handleDownload = async () => {
    if (!url.trim()) {
      toast.warn("❌ Please enter a valid YouTube URL.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendBaseUrl}/api/convert/youtube`,
        { url, quality },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        }
      );
      setDownloadData(res.data);
      toast.success("Download ready!");
      
      // Refresh quota after successful download
      try {
        const quotaRes = await axios.get(`${backendBaseUrl}/api/quota`, { 
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } 
        });
        setQuota(quotaRes.data);
      } catch (quotaErr) {
        console.error("Failed to refresh quota:", quotaErr);
      }
    } catch (err) {
      toast.error("Failed to fetch video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neon-card" style={{ maxWidth: 420, margin: "2.5rem auto", position: "relative" }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span className="text-neon" style={{ fontSize: 44, display: "block", marginBottom: 8, textShadow: 'none' }}>▶️</span>
        <h2 className="text-neon" style={{ marginBottom: 6, textShadow: 'none' }}>YouTube Downloader</h2>
        <p style={{ color: "var(--color-text)", marginBottom: 18 }}>Download YouTube videos quickly and easily.</p>
      </div>
      <input
        className="neon-input"
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", marginBottom: 18, backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
      />
      <select
        className="neon-input"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        style={{ width: "100%", marginBottom: 18, backgroundColor: "var(--color-card)", color: "var(--color-text)" }}
      >
        {qualityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button className="neon-btn" onClick={handleDownload} disabled={loading} style={{ width: "100%", marginBottom: 18 }}>
        {loading ? <span className="neon-loader" style={{ display: "inline-block", verticalAlign: "middle" }} /> : "Download"}
      </button>
      {downloadData && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href={`${process.env.REACT_APP_BACKEND_URL || `${window.location.protocol}//${window.location.hostname}:5000`}${downloadData.directDownloadUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-btn"
            style={{ 
              display: "block", 
              textAlign: "center", 
              margin: "0 auto", 
              background: "linear-gradient(90deg, var(--color-accent), var(--color-primary))",
              flex: 1
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
              textAlign: "center", 
              margin: "0 auto", 
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              flex: 1
            }}
          >
            📦 Download as ZIP
          </a>
        </div>
      )}
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
      {quota && quota.type === "user" && quota.unlimited && (
        <div style={{
          background: "#4CAF5022",
          color: "#2E7D32",
          borderRadius: 8,
          padding: "0.7rem 1rem",
          marginBottom: 16,
          fontWeight: 500,
          fontSize: 15,
          textAlign: "center"
        }}>
          ✅ Unlimited conversions available for registered users!
        </div>
      )}
    </div>
  );
};

export default YouTubeDownloader;
