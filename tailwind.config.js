module.exports = {
  theme: {
    extend: {},
    fontFamily: {
      robomono: "Roboto Mono, monospace",
      robo: "Roboto, sans-serif"
    },
    opacity: {
      99: 0.99
    },
    screens: {
      'tablet': '500px',
      // => @media (min-width: 640px) { ... }

      'laptop': '700px',
      // => @media (min-width: 1024px) { ... }

      'laptop-lg': '850px',

      'desktop': '1100px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  variants: {},
  plugins: []
};
