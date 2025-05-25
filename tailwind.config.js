const withMT = require("@material-tailwind/react/utils/withMT")
const defaultTheme = require("tailwindcss/defaultTheme")
 
module.exports = withMT({
  content: [
    './src/App.js',
    './src/index.js',
    './src/pages/**/*.{html,js,tsx}',
    './src/components/**/*.{html,js}'
  ],
  theme: {
    extend: {
    },
  },
  plugins: [],
});