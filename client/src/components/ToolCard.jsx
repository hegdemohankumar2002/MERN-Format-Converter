import React from "react";
import { Link } from "react-router-dom";
import "./ConverterCard.css";

const icons = {
  "PNG to JPG": "🖼️",
  "SVG to JPG": "🖌️",
  "RAW to JPG": "📷",
  "YouTube Downloader": "▶️",
};

const ToolCard = ({ name, path }) => {
  return (
    <Link to={path} className="converter-card">
      <div>
        <div className="icon">{icons[name] || "🔧"}</div>
        <h3>{name}</h3>
      </div>
    </Link>
  );
};

export default ToolCard;
