/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      /* 🎨 USE CSS VARIABLES (IMPORTANT) */
      colors: {
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        "primary-dark": "var(--primary-dark)",

        accent: "var(--accent)",

        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        "bg-elevated": "var(--bg-elevated)",

        text: "var(--text)",
        "text-heading": "var(--text-heading)",
        "text-muted": "var(--text-muted)",
        "text-soft": "var(--text-soft)",

        border: "var(--border)",
        "border-soft": "var(--border-soft)",
      },

      /* 🌈 GRADIENTS (SYNCED WITH index.css) */
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-soft": "var(--gradient-soft)",
      },

      /* 🌫 SHADOW SYSTEM (VERY IMPORTANT FOR DEPTH) */
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },

      /* 🔲 BORDER RADIUS SYSTEM */
      borderRadius: {
        xl: "1.5rem",
        "2xl": "2rem",
      },

      /* ✨ BACKDROP BLUR */
      backdropBlur: {
        xs: "2px",
        sm: "6px",
        md: "12px",
        lg: "24px",
      },
    },
  },

  plugins: [],
};