/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./packages/ui/src/**/*.{js,ts,jsx,tsx}'],
  presets: [require('./packages/ui/tailwind.config.js')],
};
