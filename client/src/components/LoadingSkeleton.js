import React from 'react';

const LoadingSkeleton = ({ type = "card", count = 1 }) => {
  const skeletonStyles = {
    card: {
      background: "var(--color-card)",
      border: "1px solid var(--color-border)",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1rem",
      animation: "pulse 1.5s ease-in-out infinite"
    },
    button: {
      background: "var(--color-card)",
      border: "1px solid var(--color-border)",
      borderRadius: "8px",
      height: "40px",
      width: "120px",
      animation: "pulse 1.5s ease-in-out infinite"
    },
    text: {
      background: "var(--color-border)",
      borderRadius: "4px",
      height: "16px",
      marginBottom: "8px",
      animation: "pulse 1.5s ease-in-out infinite"
    }
  };

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div style={skeletonStyles.card}>
            <div style={{ ...skeletonStyles.text, width: "60px", height: "48px", borderRadius: "8px", marginBottom: "16px" }} />
            <div style={{ ...skeletonStyles.text, width: "80%" }} />
            <div style={{ ...skeletonStyles.text, width: "60%" }} />
            <div style={{ ...skeletonStyles.text, width: "40%" }} />
          </div>
        );
      case "button":
        return <div style={skeletonStyles.button} />;
      case "text":
        return (
          <div>
            <div style={{ ...skeletonStyles.text, width: "100%" }} />
            <div style={{ ...skeletonStyles.text, width: "80%" }} />
            <div style={{ ...skeletonStyles.text, width: "60%" }} />
          </div>
        );
      default:
        return <div style={skeletonStyles.card} />;
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton; 