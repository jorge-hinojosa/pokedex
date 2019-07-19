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

      'laptop': '600px',
      // => @media (min-width: 1024px) { ... }

      'laptop-lg': '700px',

      'desktop': '850px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  variants: {},
  plugins: []
};
