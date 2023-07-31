/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-counters": "#fff",
          },
        },
      }),
      colors: {
        text: "#fff",
        background: "#fbfffa",
        primary: "#8c06c6",
        secondary: "#fca6c0",
        accent: "#9306d0",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
