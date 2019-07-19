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
      'tablet': '420px',
      // => @media (min-width: 640px) { ... }

      'laptop': '500px',
      // => @media (min-width: 1024px) { ... }

      'laptop-lg': '600px',

      'desktop': '750px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  variants: {},
  plugins: []
};
