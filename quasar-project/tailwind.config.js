/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'white':'#FFFFFF',
        'lnf-navy':'#233977',
        'lnf-red':'#EA0029',
        'lnf-orange':'#E65300',
      }
    },
  },
  plugins: [],
}

