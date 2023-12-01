/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}', './projects/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      fontFamily:{
        error: ['errorFont', 'sans-serif']
      }
    },
  },
  plugins: [],
}

