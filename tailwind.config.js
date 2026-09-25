/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FCFAF7',
        'canvas-soft': '#FFF8F6',
        surface: '#F7F4EE',
        linen: '#EFE9DF',
        olive: '#2D3B2D',
        'olive-deep': '#243024',
        caramel: '#C08A4E',
        bronze: '#B89758',
        terracotta: '#C87355',
        umber: '#3D2C24',
        muted: '#747872',
        line: '#E2DACD',
        'dark-canvas': '#1E211D',
        'dark-surface': '#282D27',
        'dark-text': '#F7F1E8',
        'dark-muted': '#C8C2B8'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 32px -4px rgba(61, 44, 36, 0.07), 0 4px 12px -2px rgba(61, 44, 36, 0.03)',
        float: '0 20px 48px -8px rgba(36, 48, 36, 0.12), 0 8px 16px -4px rgba(61, 44, 36, 0.04)',
      }
    },
  },
  plugins: [],
};
