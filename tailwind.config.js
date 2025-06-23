/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#d87d4a',
        light: '#f1f1f1',
        dark: '#101010',
        orangeLight: '#fbaf85',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
