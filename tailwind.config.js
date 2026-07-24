/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        food: {
          warm: '#f97316',
          deep: '#c2410c',
          earth: '#78350f',
          cream: '#fef9f0',
          sage: '#65a30d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
            a: { color: '#d97706' },
            h1: { color: '#111827' },
            h2: { color: '#1f2937' },
            h3: { color: '#374151' },
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}