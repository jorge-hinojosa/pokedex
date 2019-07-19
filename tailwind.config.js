module.exports = {
  theme: {
    extend: {},
    opacity: {
      99: 0.99
    },
    screens: {
      'xs': '500px',
      // => @media (min-width: 640px) { ... }

      'sm': '640px',
      // => @media (min-width: 1024px) { ... }

      'md': '780px',

      'lg': '900px',

      'xl': '1050px',

      'xxl': '1195px',

      'xxxl': '1490px'
      // => @media (min-width: 1280px) { ... }
    }
  },
  variants: {},
  plugins: []
};
