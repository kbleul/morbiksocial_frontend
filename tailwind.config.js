/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'content-spliter': ['"Aboreto"', 'cursive'],
        'logo' : ['"Bungee Spice"', 'cursive']
      },
      height: {
        'nav': '6.25rem',
      },
      margin: {
        "from-nav" : "6.26rem"
      },

    },
  },
  plugins: [],
}
