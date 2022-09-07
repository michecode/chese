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
      animation: {
        face: 'face-spin 16s ease-in-out infinite',
      },
      keyframes: {
        'face-spin': {
          '0%': {
            transform: 'rotate(360deg)',
            transformOrigin: 'center',
          },
          '50%': {
            transform: 'rotate(0deg)',
            transformOrigin: 'center',
          },
          '100%': {
            transform: 'rotate(360deg)',
            transformOrigin: 'center',
          },
        },
      },
    },
  },
  plugins: [],
};
