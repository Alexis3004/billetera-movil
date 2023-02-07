/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    minHeight: {
      'main': 'calc( 100vh - 50px)',
    },
    extend: {
      gridTemplateRows: {
        'layout-2': '50px 1fr',
      }
    },
  },
  plugins: [],
}
