/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT")
 
module.exports = withMT({
  content: [
    './src/App.js',
    './src/index.js',
    './src/pages/**/*.{html,js,tsx}',
    './src/components/**/*.{html,js}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});