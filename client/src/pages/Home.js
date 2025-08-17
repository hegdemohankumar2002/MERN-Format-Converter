import React, { useState, useEffect } from "react";
import "../App.css";
import ConverterCard from "../components/ConverterCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Tooltip from "../components/Tooltip";
import SearchBar from "../components/SearchBar";

const allTools = [
  { name: "HEIC to JPG", path: "/dashboard?tool=heic2jpg", description: "Convert HEIC images to JPG format instantly.", icon: "🌄", category: "image" },
  { name: "RAW to JPG", path: "/dashboard?tool=raw", description: "Convert RAW camera files to standard JPG images.", icon: "📷", category: "image" },
  { name: "PNG to JPG", path: "/dashboard?tool=png2jpg", description: "Convert PNG images to JPG format easily.", icon: "🖼️", category: "image" },
  { name: "JPG to PNG", path: "/dashboard?tool=jpg2png", description: "Convert JPG images to PNG format.", icon: "🖼️", category: "image" },
  { name: "JPG to SVG", path: "/dashboard?tool=jpg2svg", description: "Convert JPG images to SVG vector graphics.", icon: "🎨", category: "image" },
  { name: "SVG to JPG", path: "/dashboard?tool=svg2jpg", description: "Transform SVG vector images into JPG files.", icon: "🖌️", category: "image" },

  { name: "HEVC to MP4", path: "/dashboard?tool=hevc", description: "Convert HEVC videos to MP4 format.", icon: "🎬", category: "video" },
  { name: "MP4 to MP3", path: "/dashboard?tool=mp3", description: "Extract MP3 audio from MP4 videos.", icon: "🎵", category: "audio" },
  { name: "YouTube Downloader", path: "/dashboard?tool=ytdl", description: "Download YouTube videos quickly and easily.", icon: "▶️", category: "video" },
];

const Home = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { key: "all", name: "All Tools", icon: "🔧", tooltip: "View all available conversion tools" },
    { key: "image", name: "Image Converters", icon: "🖼️", tooltip: "Convert between different image formats" },
    { key: "document", name: "Document Converters", icon: "📄", tooltip: "Convert between PDF and Word documents" },
    { key: "video", name: "Video Converters", icon: "🎬", tooltip: "Convert video files to different formats" },
    { key: "audio", name: "Audio Extractors", icon: "🎵", tooltip: "Extract audio from video files" },
  ];

  // Filter tools based on category and search term
  const filteredTools = allTools.filter(tool => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch = searchTerm === "" || 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className={`home-bg theme-${theme}`} style={{ 
      minHeight: "100vh", 
      background: 'var(--color-bg)', 
      transition: 'background 0.4s', 
      position: 'relative', 
      overflow: 'hidden',
      paddingTop: '80px' // Add padding for fixed header
    }}>
      <div className="home" style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <Header />
        
        {/* Hero Section */}
        <section style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1rem 2rem 1rem",
          textAlign: "center",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <h1 className="text-neon" style={{ 
            fontFamily: '"M PLUS Rounded 1c", Inter, Arial, sans-serif', 
            fontSize: "clamp(2.5rem, 6vw, 4rem)", 
            fontWeight: 800, 
            marginBottom: 16, 
            color: 'var(--color-anime-purple)',
            lineHeight: 1.2
          }}>
            Convert and Download with Ease
          </h1>
          <p style={{ 
            color: "var(--color-anime-blue)", 
            fontSize: "clamp(18px, 3.5vw, 22px)", 
            maxWidth: 700, 
            marginBottom: 32,
            lineHeight: 1.6
          }}>
            The ultimate file conversion platform. Convert images, videos, and audio files with lightning speed, 
            complete security, and professional quality. No registration required.
          </p>
          


          <Tooltip content="Browse our collection of conversion tools">
            <a 
              href="#tools" 
              className="neon-btn anime-sparkle-btn" 
              style={{ 
                fontSize: "clamp(18px, 3vw, 22px)", 
                marginBottom: 32, 
                background: 'linear-gradient(90deg, var(--color-anime-pink), var(--color-anime-blue))', 
                color: 'var(--color-btn-text)', 
                fontWeight: 700,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s",
                padding: "1rem 2rem"
              }}
            >
              Start Converting Now
            </a>
          </Tooltip>
          
          {/* Dynamic SVG background visual */}
          <svg width="320" height="80" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", zIndex: 0, opacity: 0.18 }}>
            <ellipse cx="160" cy="40" rx="150" ry="30" fill="url(#paint0_radial)" />
            <defs>
              <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(160 40) scale(150 30)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7f5cff" />
                <stop offset="1" stopColor="#00eaff" stopOpacity="0.2" />
              </radialGradient>
            </defs>
          </svg>
        </section>
        
        {/* Wavy divider */}
        <svg className="anime-divider" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 24C240 48 480 0 720 24C960 48 1200 0 1440 24V48H0V24Z" fill="var(--color-anime-pink)" fillOpacity="0.18"/>
        </svg>
        

        
        {/* Tool Showcase */}
        <section id="tools" style={{
          padding: "4rem 1rem",
          zIndex: 1,
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "3rem"
          }}>
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: "1rem"
            }}>
              Our Conversion Tools
            </h2>
            <p style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6
            }}>
              Choose from our comprehensive suite of file conversion tools designed for every need.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for conversion tools..."
            tools={allTools}
          />

          {/* Category Filter - Compact Dropdown */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
            padding: "0 1rem"
          }}>
            <div style={{
              position: "relative",
              display: "inline-block"
            }}>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                  style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                  fontSize: "14px",
                  fontWeight: 500,
                    cursor: "pointer",
                  minWidth: "200px",
                  appearance: "none",
                  backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%204.5A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 8px center",
                  backgroundSize: "12px auto",
                  paddingRight: "32px"
                }}
              >
                {categories.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          {searchTerm && (
            <div style={{
              textAlign: "center",
              marginBottom: "1rem",
              color: "var(--color-text-muted)",
              fontSize: "14px"
            }}>
              Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} for "{searchTerm}"
            </div>
          )}

          {/* Tools Grid - Compact */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            padding: "0 1rem"
          }}>
            {filteredTools.map((tool, idx) => (
              <div
                key={idx}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.1 * idx}s, transform 0.6s ease ${0.1 * idx}s`
                }}
              >
                <ConverterCard 
                  name={tool.name} 
                  path={tool.path} 
                  description={tool.description}
                  icon={tool.icon}
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "3rem 1rem",
              color: "var(--color-text-muted)"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                {searchTerm ? "🔍" : "📝"}
              </div>
              <h3>
                {searchTerm ? "No tools found" : "No tools available"}
              </h3>
              <p>
                {searchTerm 
                  ? `No tools match "${searchTerm}". Try a different search term or category.`
                  : "Check back later for new tools or try a different category."
                }
              </p>
            </div>
          )}
        </section>

        {/* Features Section */}
        <Features />

        {/* Call to Action */}
        <CTA />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
