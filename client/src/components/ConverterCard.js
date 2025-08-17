import React from "react";
import { Link } from "react-router-dom";
import "./ConverterCard.css";

const icons = {
  "PNG to JPG": "🖼️",
  "SVG to JPG": "🖌️",
  "RAW to JPG": "📷",
  "HEIC to JPG": "🌄",
  "JPG to PNG": "🖼️",
  "JPG to SVG": "🎨",
  "PDF to Word": "📄",
  "Word to PDF": "📝",
  "HEVC to MP4": "🎬",
  "MP4 to MP3": "🎵",
  "YouTube Downloader": "▶️",
};

const ConverterCard = ({ name, path, description, icon }) => {
  const displayIcon = icon || icons[name] || "🔄";
  
  return (
    <Link 
      to={path} 
      className="neon-card converter-card"
      aria-label={`Convert files using ${name}`}
      tabIndex={0}
    >
      <div className="icon text-neon" style={{ fontSize: 32, marginBottom: 8 }}>
        {displayIcon}
      </div>
      <h3 style={{ marginBottom: 6 }}>{name}</h3>
      {description && (
        <p style={{ 
          color: "#b3b3ff", 
          fontSize: 13, 
          minHeight: 30,
          lineHeight: 1.3,
          margin: 0
        }}>
          {description}
        </p>
      )}
      <div className="card-overlay" aria-hidden="true"></div>
    </Link>
  );
};

export default ConverterCard;
