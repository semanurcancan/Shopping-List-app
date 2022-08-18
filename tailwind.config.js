/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink-bej': '#e8dbea;',
      },
      fontFamily: {
        dancing: 'Dancing Script'

      }
    },
  },
  plugins: [],
}
