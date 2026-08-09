import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // rgb(var(--x) / <alpha-value>) es el patrón que necesita Tailwind
        // para poder aplicar opacidad (bg-primary/10, text-accent/40, etc.)
        // a colores respaldados por variables CSS. Las variables en
        // globals.css guardan tripletas "R G B" a propósito para esto.
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
          light: "rgb(var(--color-primary-light) / <alpha-value>)",
        },
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        background: {
          DEFAULT: "rgb(var(--color-background) / <alpha-value>)",
          alt: "rgb(var(--color-background-alt) / <alpha-value>)",
        },
        border: "rgb(var(--color-border) / <alpha-value>)",
        foreground: {
          DEFAULT: "rgb(var(--color-foreground) / <alpha-value>)",
          muted: "rgb(var(--color-foreground-muted) / <alpha-value>)",
        },
        success: "rgb(var(--color-success) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(11, 30, 61, 0.12)",
        "card-hover": "0 12px 32px -8px rgba(11, 30, 61, 0.22)",
        glow: "0 0 0 1px rgb(var(--color-accent)), 0 0 24px -4px rgb(var(--color-accent))",
      },
      backgroundImage: {
        circuit:
          "radial-gradient(circle at 1px 1px, rgb(var(--color-border)) 1px, transparent 0)",
        "hero-gradient":
          "linear-gradient(135deg, rgb(var(--color-secondary)) 0%, rgb(var(--color-primary-dark)) 55%, rgb(var(--color-primary)) 100%)",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
