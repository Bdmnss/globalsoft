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
      container: {
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem',
          md: '2.5rem',
          lg: '3rem',
          xl: '3.5rem',
          '2xl': '4rem',
        },
      },
      colors: {
        orange: '#d87d4a',
        light: '#f1f1f1',
        dark: '#101010',
        orangeLight: '#fbaf85',
        charcoal: '#181818',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
