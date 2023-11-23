module.exports = {
  //...
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('daisyui')],
  mode: 'jit',
  daisyui: {
    themes: ["light", "dark", "emerald", "garden"],
  },

}
