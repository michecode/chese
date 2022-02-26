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
      backgroundSize: {
        fill: 'length:100%',
      },
    },
  },
  plugins: [],
};
