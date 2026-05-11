/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        rail: {
          ink: '#0B1A3A',
          ink2: '#142754',
          saffron: '#FF6B1A',
          saffron2: '#E5530A',
          cream: '#F7F1E3',
          cream2: '#EFE6CF',
          rust: '#8B3A1F',
          jade: '#1F6B4C',
          steel: '#3D4A5C',
          chalk: '#FFFDF7',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        prose2: '68ch',
      },
    },
  },
  plugins: [],
};
