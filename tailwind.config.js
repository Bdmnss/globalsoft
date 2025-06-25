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
        softGrayBg: '#80808038',
      },
      keyframes: {
        'slide-top-to-bottom': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        dropdownOpen: {
          '0%': { opacity: 0, transform: 'scaleY(0.75)' },
          '100%': { opacity: 1, transform: 'scaleY(1)' },
        },
      },
      animation: {
        'slide-top-to-bottom':
          'slide-top-to-bottom 0.4s cubic-bezier(.4,0,.2,1)',
        dropdown: 'dropdownOpen 0.18s cubic-bezier(0.4,0,0.2,1)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
