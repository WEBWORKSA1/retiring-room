/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Indian Railway-inspired palette — modernized, not literal.
        // Deep prussian/navy (coach livery) + IR saffron + cream + slate.
        rail: {
          ink: '#0B1A3A',        // deep prussian — primary
          ink2: '#142754',       // softer navy for surfaces
          saffron: '#FF6B1A',    // IR signal orange — accent
          saffron2: '#E5530A',   // darker saffron for hover
          cream: '#F7F1E3',      // ticket-paper cream — background
          cream2: '#EFE6CF',     // sepia surface
          rust: '#8B3A1F',       // brick — secondary accent
          jade: '#1F6B4C',       // platform-tile green — tertiary
          steel: '#3D4A5C',      // rail steel — body text
          chalk: '#FFFDF7',      // off-white
        },
      },
      fontFamily: {
        // Display: a serif with character. Body: a clean grotesque.
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
