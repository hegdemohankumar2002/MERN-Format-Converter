import React from 'react';

const ProgressBar = ({ 
  progress, 
  label = "Progress", 
  showPercentage = true, 
  height = 8, 
  color = "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
  backgroundColor = "var(--color-border)"
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: "var(--color-text)", fontSize: 14 }}>{label}</span>
        {showPercentage && (
          <span style={{ color: "var(--color-accent)", fontSize: 14 }}>{progress}%</span>
        )}
      </div>
      <div style={{
        width: "100%",
        height: height,
        background: backgroundColor,
        borderRadius: height / 2,
        overflow: "hidden"
      }}>
        <div style={{
          width: `${progress}%`,
          height: "100%",
          background: color,
          transition: "width 0.3s ease",
          borderRadius: height / 2
        }} />
      </div>
    </div>
  );
};

export default ProgressBar; 