/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1440px',
        },
      },
      extend: {
        fontSize: {
          sm: '14px',
          base: '16px',
          '2xl': '24px',
          '4xl': '40px',
          '5xl': '51px',
          '6xl': '67px',
          '8xl': '93px',
        },
        colors: {
          black: 'black',
          orange: {
            400: '#F5A428',
            500: '#F39200',
            600: '#E08400',
          },
        },
      },
    },
    plugins: [],
  };
  