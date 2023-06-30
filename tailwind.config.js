/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#010B14',
        secondary: '#2A2A2A',
        tcolor: '#e2e2e2',
        highlight: '#006FFF',
        highlight_darker: '#001BCE'
      } 
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
