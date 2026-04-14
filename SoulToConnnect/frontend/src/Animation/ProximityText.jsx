import { useEffect, useRef } from "react";

const ProximityText = ({
  text,
  className = "",
  radius = 120,   // distance sensitivity
  strength = 30,  // movement strength
}) => {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      lettersRef.current.forEach((el) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const force = (1 - dist / radius);

          el.style.transform = `
            translate(${dx * force * 0.15}px, ${dy * force * 0.15}px)
            scale(${1 + force * 0.3})
          `;
          el.style.opacity = 0.7 + force * 0.3;
        } else {
          el.style.transform = "translate(0,0) scale(1)";
          el.style.opacity = 1;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [radius]);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => (lettersRef.current[i] = el)}
          style={{
            display: "inline-block",
            transition: "transform 0.15s ease-out, opacity 0.2s ease",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default ProximityText;