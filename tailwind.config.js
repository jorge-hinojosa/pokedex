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
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '768px',
      // => @media (min-width: 1024px) { ... }

      'laptop-lg': '1024px',

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  variants: {},
  plugins: []
};
