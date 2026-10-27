/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './ht/**/*.html',
    './src/ht/**/*.{js,ts,tsx,css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo', 'Assistant', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mk-display': 'var(--mk-font-display)',
        'mk-body': 'var(--mk-font-body)',
        'mk-hand': 'var(--mk-font-hand)',
        'mk-wordmark': 'var(--mk-font-wordmark)',
      },
      colors: {
        mk: {
          'sky-deep': 'var(--mk-sky-deep)',
          sky: 'var(--mk-sky)',
          'sky-mid': 'var(--mk-sky-mid)',
          'sky-soft': 'var(--mk-sky-soft)',
          mist: 'var(--mk-mist)',
          paper: 'var(--mk-paper)',
          ink: 'var(--mk-ink)',
          'ink-2': 'var(--mk-ink-2)',
          signal: 'var(--mk-signal)',
        },
      },
      backgroundImage: {
        'mk-sky': 'var(--mk-sky-gradient)',
      },
      borderRadius: {
        'mk-frame': 'var(--mk-r-frame)',
        'mk-card': 'var(--mk-r-card)',
        'mk-pill': 'var(--mk-r-pill)',
      },
      boxShadow: {
        'mk-float': 'var(--mk-shadow-float)',
      },
    },
  },
  plugins: [],
}
