/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-pink-light': '#F7DAE6',
        'custom-pink-extra-light': '#FCF0F5',
        'custom-taupe-medium': '#A39189',
        'custom-taupe-dark': '#6F5F5E',
      },
      screens: {
        'xl_custom': '1290px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}

