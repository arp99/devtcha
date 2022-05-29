module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          700: "rgb(190, 18, 60)",
        },
        primary_dark: {
          700: "rgb(45,142,190)"
        }
      },
    },
  },
  variants: {
    extend: {
      backgroundBlendMode: ["hover", "focus"],
      filter: ["hover", "focus"],
      contrast: ["hover", "focus"],
    },
  },
  plugins: [],
};
