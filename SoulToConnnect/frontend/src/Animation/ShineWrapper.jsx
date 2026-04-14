import React from "react";

const ShineWrapper = ({
  children,
  className = "",
  duration = 3.5, // slower = premium
}) => {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      {children}

      {/* Premium Shine */}
      <span
        style={{
          position: "absolute",
          top: "-20%",
          left: "-150%",
          width: "20%", // slightly wider for softness
          height: "140%",
          pointerEvents: "none",
          borderRadius: "8px",
          background: `
            linear-gradient(
              120deg,
              transparent 0%,
              rgba(255,255,255,0.15) 30%,
              rgba(255,255,255,0.6) 50%,
              rgba(255,255,255,0.15) 70%,
              transparent 100%
            )
          `,
          transform: "skewX(-20deg)",
          animation: `shineMove ${duration}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
        }}
      />

      <style>
        {`
        @keyframes shineMove {
          0% {
            left: -150%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            left: 150%;
            opacity: 0;
          }
        }
        `}
      </style>
    </div>
  );
};

export default ShineWrapper;