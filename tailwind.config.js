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
        background: "#181532",
        primary: "#2F2963",
        secondary: "#9794B1",
        accent: "#241F4B",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
