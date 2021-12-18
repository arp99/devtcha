module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          700: "rgb(190, 18, 60)",
        },
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
