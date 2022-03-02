module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Basier Circle'],
    },
    extend: {
      backgroundImage: {
        gradient: "url('../images/iridescent-gradient.png')",
      },
      colors: {
        blackrgba: 'rgba(0,0,0,0.8)',
      },
    },
  },
  plugins: [],
};
