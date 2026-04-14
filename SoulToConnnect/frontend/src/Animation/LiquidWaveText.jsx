import { useId, useRef, useState, useLayoutEffect } from "react";

const LiquidWaveText = ({
  text,
  className = "",
  fontSize = 48,
  color = "currentColor",
  fontWeight = "bold",
  fontFamily = "inherit",
}) => {
  const id = useId();
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(text.length * fontSize * 0.6);

  useLayoutEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.getBBox().width);
    }
  }, [text, fontSize]);

  const svgWidth = textWidth + fontSize * 0.9;
  const svgHeight = fontSize * 1.6;
  const yBase = fontSize * 1.1;

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        lineHeight: 1,
        verticalAlign: "middle",
      }}
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width={svgWidth}
        height={svgHeight}
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>

          {/* ── 1. Liquid morph — slow organic shape warp ── */}
          <filter id={`morph-${id}`} x="-8%" y="-20%" width="116%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.008"
              numOctaves="3"
              seed="5"
            >
              <animate
                attributeName="baseFrequency"
                dur="6s"
                values="0.012 0.008; 0.018 0.014; 0.010 0.006; 0.012 0.008"
                repeatCount="indefinite"
              />
              <animate
                attributeName="seed"
                dur="12s"
                values="5;8;3;5"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* ── 2. Ripple — fast horizontal wave ── */}
          <filter id={`ripple-${id}`} x="-5%" y="-15%" width="110%" height="130%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.035 0.002"
              numOctaves="1"
              seed="1"
            >
              <animate
                attributeName="baseFrequency"
                dur="2.4s"
                values="0.035 0.002; 0.035 0.002"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="patternTransform"
                type="translate"
                from="0 0"
                to="100 0"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* ── 3. Shimmer — brightness pulse clipped to text ── */}
          <filter id={`shimmer-${id}`} x="-5%" y="-10%" width="110%" height="120%">
            <feColorMatrix
              type="saturate"
              values="1"
            >
              <animate
                attributeName="values"
                dur="3s"
                values="1; 1.4; 0.7; 1.2; 1"
                repeatCount="indefinite"
              />
            </feColorMatrix>
            <feComponentTransfer>
              <feFuncR type="linear" intercept="0">
                <animate attributeName="intercept" dur="3s" values="0;0.12;-0.08;0.1;0" repeatCount="indefinite" />
              </feFuncR>
              <feFuncG type="linear" intercept="0">
                <animate attributeName="intercept" dur="3s" values="0;0.12;-0.08;0.1;0" repeatCount="indefinite" />
              </feFuncG>
              <feFuncB type="linear" intercept="0">
                <animate attributeName="intercept" dur="3s" values="0;0.12;-0.08;0.1;0" repeatCount="indefinite" />
              </feFuncB>
            </feComponentTransfer>
          </filter>

          {/* ── 4. Composite: morph + ripple merged ── */}
          <filter id={`liquid-${id}`} x="-10%" y="-20%" width="120%" height="140%">
            {/* Turbulence A — slow deep warp */}
            <feTurbulence
              result="turbA"
              type="fractalNoise"
              baseFrequency="0.010 0.006"
              numOctaves="4"
              seed="3"
            >
              <animate
                attributeName="baseFrequency"
                dur="8s"
                values="0.010 0.006; 0.016 0.012; 0.008 0.005; 0.010 0.006"
                repeatCount="indefinite"
              />
            </feTurbulence>

            {/* Turbulence B — fast surface ripple */}
            <feTurbulence
              result="turbB"
              type="turbulence"
              baseFrequency="0.040 0.003"
              numOctaves="1"
              seed="7"
            >
              <animate
                attributeName="baseFrequency"
                dur="1.8s"
                values="0.040 0.003; 0.042 0.003; 0.040 0.003"
                repeatCount="indefinite"
              />
            </feTurbulence>

            {/* Merge both turbulences */}
            <feMerge result="turbMerged">
              <feMergeNode in="turbA" />
              <feMergeNode in="turbB" />
            </feMerge>

            {/* Displace with merged turbulence */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbMerged"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />

            {/* Brightness shimmer on top */}
            <feComponentTransfer>
              <feFuncR type="linear" slope="1" intercept="0">
                <animate attributeName="intercept" dur="2.5s" values="0;0.15;-0.1;0.08;0" repeatCount="indefinite" />
              </feFuncR>
              <feFuncG type="linear" slope="1" intercept="0">
                <animate attributeName="intercept" dur="2.5s" values="0;0.15;-0.1;0.08;0" repeatCount="indefinite" />
              </feFuncG>
              <feFuncB type="linear" slope="1" intercept="0">
                <animate attributeName="intercept" dur="2.5s" values="0;0.15;-0.1;0.08;0" repeatCount="indefinite" />
              </feFuncB>
            </feComponentTransfer>
          </filter>

        </defs>

        {/* Hidden measurer */}
        <text
          ref={textRef}
          x={fontSize * 0.45}
          y={yBase}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          style={{ visibility: "hidden", whiteSpace: "pre" }}
        >
          {text}
        </text>

        {/* Layer 1 — base solid text (anchors the layout, never moves) */}
        <text
          x={fontSize * 0.45}
          y={yBase}
          fontSize={fontSize}
          fill={color}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          opacity="0.18"
          style={{ whiteSpace: "pre" }}
        >
          {text}
        </text>

        {/* Layer 2 — deep liquid warp (main animated layer) */}
        <text
          x={fontSize * 0.45}
          y={yBase}
          fontSize={fontSize}
          fill={color}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          filter={`url(#liquid-${id})`}
          style={{ whiteSpace: "pre" }}
        >
          {text}
        </text>

        {/* Layer 3 — fast surface ripple at low opacity */}
        <text
          x={fontSize * 0.45}
          y={yBase}
          fontSize={fontSize}
          fill={color}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          filter={`url(#ripple-${id})`}
          opacity="0.35"
          style={{ whiteSpace: "pre" }}
        >
          {text}
        </text>

      </svg>
    </span>
  );
};

export default LiquidWaveText;