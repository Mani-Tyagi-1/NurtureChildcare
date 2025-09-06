// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "scroll-right": "scrollRight 20s linear infinite",

        shimmer: "shimmer 2s linear infinite",
      },
      colors: {
        "light-blue": "#E0F2FE", // sky-100
        "dark-blue": "#1E3A8A", // blue-900
        "accent-purple": "#A855F7", // purple-500
        "accent-purple-dark": "#9333EA", // purple-700
      },
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      animation: {
        "scroll-left": "scrollLeft 15s linear infinite",
        "spin-slow-glow":
          "spin 6s linear infinite, pulseGlow 2.5s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 10px rgba(0, 191, 255, 0.6), 0 0 20px rgba(30, 144, 255, 0.6)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(0, 191, 255, 0.8), 0 0 40px rgba(30, 144, 255, 0.8)",
          },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
