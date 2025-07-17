/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#3B82F6',
              '&:hover': {
                color: '#1D4ED8',
              },
            },
            h1: {
              color: '#1F2937',
            },
            h2: {
              color: '#1F2937',
            },
            h3: {
              color: '#1F2937',
            },
            h4: {
              color: '#1F2937',
            },
            strong: {
              color: '#1F2937',
            },
            code: {
              color: '#DC2626',
              backgroundColor: '#F3F4F6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1F2937',
              color: '#F9FAFB',
            },
            blockquote: {
              borderLeftColor: '#3B82F6',
              color: '#6B7280',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 