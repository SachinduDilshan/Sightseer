/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors for your travel website
        primary: {
          DEFAULT: '#38B2AC', // teal-500
          dark: '#2C7A7B',    // teal-600
        },
      },
      backgroundColor: {
        'dark-primary': '#1A202C', // dark mode background
        'dark-secondary': '#2D3748', // dark mode secondary background
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      transitionDuration: {
        '200': '200ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}