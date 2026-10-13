// Builds assets/tw.css at deploy time (see wrangler.jsonc build.command). Keep in sync with the fallback in index.html.
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        white: '#2A1A1E',   // "white" utilities = ink text on the vanilla page
        ink: '#F4E9D0',     // "ink" utilities = vanilla paper
        panel: '#FBF5E6',
        line: 'rgba(122,15,42,0.16)',
        amber: { 100: '#F4E9D0', 200: '#7A0F2A' },
        rose: { 100: '#F4E9D0', 400: '#E8753D' },
      },
      fontFamily: {
        sans: ['Inter', 'var(--sans-cjk)', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['var(--serif-latin)', 'var(--serif-cjk)', 'Georgia', 'serif'],
      },
    },
  },
};
