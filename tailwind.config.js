/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    minHeight: {
      'main': 'calc( 100vh - 60px)',
    },
    extend: {
      gridTemplateRows: {
        'layout-2': '60px 1fr',
      }
    },
  },
  plugins: [],
}
