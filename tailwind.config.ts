import type { Config } from "tailwindcss";

const config: Config = {
  // ── Scan all files that might contain Tailwind classes ──
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // ── Brand colour palette ──
      colors: {
        maroon: {
          DEFAULT: "#800000",
          dark:    "#1a0a0a",
          mid:     "#2d0d0d",
          light:   "#a00000",
        },
        gold: {
          DEFAULT: "#D4AF77",
          light:   "#ffd700",
          dark:    "#b8860b",
          muted:   "rgba(212,175,119,0.35)",
        },
        cream: {
          DEFAULT: "#faf6ef",
          dark:    "#f0e9de",
        },
        charcoal: "#1a1a1a",
      },

      // ── Typography ──
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "Times", "serif"],
        sans:  ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      },

      // ── Spacing extras ──
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "128": "32rem",
      },

      // ── Max widths ──
      maxWidth: {
        "8xl": "90rem",
      },

      // ── Letter spacing ──
      letterSpacing: {
        widest: "0.3em",
        ultra:  "0.45em",
      },

      // ── Box shadows ──
      boxShadow: {
        gold:      "0 0 30px rgba(212, 175, 119, 0.35)",
        "gold-lg": "0 8px 40px rgba(212, 175, 119, 0.25)",
        card:      "0 4px 24px rgba(26, 10, 10, 0.08)",
      },

      // ── Keyframe animations ──
      keyframes: {
        goldShimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":       { backgroundPosition: "100% 50%" },
        },
        doorReveal: {
          "0%":   { clipPath: "inset(0 50% 0 50%)", opacity: "0" },
          "60%":  { opacity: "1" },
          "100%": { clipPath: "inset(0 0% 0 0%)", opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        floatGold: {
          "0%":   { transform: "translateY(0px) scale(1)",    opacity: "0" },
          "20%":  { opacity: "0.7" },
          "50%":  { transform: "translateY(-22px) scale(1.3)", opacity: "0.5" },
          "80%":  { opacity: "0.2" },
          "100%": { transform: "translateY(-45px) scale(0.8)", opacity: "0" },
        },
        floatIn: {
          from: { opacity: "0", transform: "translateY(48px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        pulseGold: {
          "0%, 100%": { opacity: "0.6" },
          "50%":       { opacity: "1" },
        },
      },

      // ── Named animations ──
      animation: {
        "gold-shimmer": "goldShimmer 4s ease infinite",
        "door-reveal":  "doorReveal 1.4s cubic-bezier(0.22,0.61,0.36,1) forwards",
        "fade-up":      "fadeUp 1s ease forwards",
        "float-gold":   "floatGold 5s ease-in-out infinite",
        "float-in":     "floatIn 0.7s ease forwards",
        "pulse-gold":   "pulseGold 2s ease-in-out infinite",
      },

      // ── Screen breakpoints (keep defaults, add one extra) ──
      screens: {
        "2xl": "1400px",
      },

      // ── Transition durations ──
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },

      // ── Z-index scale ──
      zIndex: {
        "60":  "60",
        "70":  "70",
        "100": "100",
      },
    },
  },

  plugins: [],
};

export default config;
