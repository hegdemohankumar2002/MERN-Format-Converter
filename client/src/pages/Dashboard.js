import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

import HEICToJPG from "../components/Converter/HEICToJPG";
import RAWToJPG from "../components/Converter/RAWToJPG";
import PNGToJPG from "../components/Converter/PNGToJPG";
import JPGToPNG from "../components/Converter/JPGToPNG";
import JPGToSVG from "../components/Converter/JPGToSVG";
import SVGToJPG from "../components/Converter/SVGToJPG";

// PDF/Word converters removed due to compatibility issues

import HEVCToMP4 from "../components/Converter/HEVCToMP4";
import MP4ToMP3 from "../components/Converter/MP4ToMP3";
import YouTubeDownloader from "../components/Converter/YouTubeDownloader";

const TOOL_COMPONENTS = {
  heic2jpg: HEICToJPG,
  raw: RAWToJPG,
  png2jpg: PNGToJPG,
  jpg2png: JPGToPNG,
  jpg2svg: JPGToSVG,
  svg2jpg: SVGToJPG,

  // pdf2word: PDFToWord, // Removed due to compatibility issues
  // word2pdf: WordToPDF, // Removed due to compatibility issues

  hevc: HEVCToMP4,
  mp3: MP4ToMP3,
  ytdl: YouTubeDownloader,
};

const TOOL_INFO = {
  heic2jpg: { name: "HEIC to JPG", icon: "🌄", description: "Convert HEIC images to JPG format" },
  raw: { name: "RAW to JPG", icon: "📷", description: "Convert RAW camera files to JPG" },
  png2jpg: { name: "PNG to JPG", icon: "🖼️", description: "Convert PNG images to JPG format" },
  jpg2png: { name: "JPG to PNG", icon: "🖼️", description: "Convert JPG images to PNG format" },
  jpg2svg: { name: "JPG to SVG", icon: "🎨", description: "Convert JPG images to SVG vector graphics" },
  svg2jpg: { name: "SVG to JPG", icon: "🖌️", description: "Transform SVG vector images into JPG files" },

  
  hevc: { name: "HEVC to MP4", icon: "🎬", description: "Convert HEVC videos to MP4 format" },
  mp3: { name: "MP4 to MP3", icon: "🎵", description: "Extract MP3 audio from MP4 videos" },
  ytdl: { name: "YouTube Downloader", icon: "▶️", description: "Download YouTube videos quickly and easily" },
};

const Dashboard = ({ theme }) => {
  const [params] = useSearchParams();
  const tool = params.get("tool");
  const SelectedToolComponent = tool ? TOOL_COMPONENTS[tool] : null;
  const toolInfo = tool ? TOOL_INFO[tool] : null;

  return (
    <div className={`dashboard-bg theme-${theme}`} style={{ minHeight: '100vh', background: 'var(--color-bg)', transition: 'background 0.4s' }}>
      <div className="neon-card" style={{ maxWidth: 800, margin: "2.5rem auto", padding: "2.5rem 1.5rem", position: "relative" }}>
        {/* Dynamic SVG visual */}
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none" style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)', opacity: 0.18, zIndex: 0 }}>
          <ellipse cx="60" cy="20" rx="58" ry="12" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(60 20) scale(58 12)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7f5cff" />
              <stop offset="1" stopColor="#00eaff" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>

        {/* Breadcrumb Navigation */}
        <Breadcrumb toolName={toolInfo?.name} />

        {tool ? (
          <>
            {/* Tool Header */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{toolInfo?.icon}</div>
              <h1 className="text-neon" style={{ marginBottom: 8, textShadow: 'none' }}>
                {toolInfo?.name}
              </h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 16, marginBottom: 16 }}>
                {toolInfo?.description}
              </p>
              
              {/* Quick Tool Selection */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 8, 
                justifyContent: 'center',
                marginTop: 16
              }}>
                {Object.entries(TOOL_INFO).map(([key, info]) => (
                  <Link
                    key={key}
                    to={`/dashboard?tool=${key}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 20,
                      background: key === tool ? 'var(--color-primary)' : 'var(--color-card)',
                      border: `1px solid ${key === tool ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      color: key === tool ? 'var(--color-btn-text)' : 'var(--color-text)',
                      textDecoration: 'none',
                      fontSize: 12,
                      fontWeight: 500,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (key !== tool) {
                        e.target.style.background = 'var(--color-bg-alt)';
                        e.target.style.borderColor = 'var(--color-primary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (key !== tool) {
                        e.target.style.background = 'var(--color-card)';
                        e.target.style.borderColor = 'var(--color-border)';
                      }
                    }}
                  >
                    <span>{info.icon}</span>
                    <span>{info.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {SelectedToolComponent ? (
              <SelectedToolComponent />
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
                <h3 style={{ color: 'var(--color-error)', marginBottom: 8 }}>Unknown Tool</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>
                  The selected tool is not available. Please choose a valid tool from the options above.
                </p>
                <Link 
                  to="/" 
                  className="neon-btn"
                  style={{ display: 'inline-block' }}
                >
                  ← Back to Home
                </Link>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔧</div>
            <h2 style={{ marginBottom: 8 }}>Select a Tool</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>
              Choose a conversion tool from the home page to get started.
            </p>
            
            {/* Tool Grid for Dashboard - Compact */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
              gap: 12,
              marginTop: 24
            }}>
              {Object.entries(TOOL_INFO).map(([key, info]) => (
                <Link
                  key={key}
                  to={`/dashboard?tool=${key}`}
                  className="neon-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{info.icon}</div>
                  <h3 style={{ marginBottom: 6, color: 'var(--color-text)', fontSize: '0.9rem' }}>{info.name}</h3>
                  <p style={{ 
                    color: 'var(--color-text-muted)', 
                    fontSize: 12, 
                    textAlign: 'center',
                    lineHeight: 1.3
                  }}>
                    {info.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
