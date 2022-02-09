module.exports = {
  content: [
    // Tell tailwind the files or components to apply the tailwind's style.
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  // Tailwind.css will toggle the dark mode depending on the browser's preference.
  darkMode: 'media',
  // Tailwind.css will apply the dark mode if the 'dark' className exists.
  // darkMode: 'class',
  plugins: [],
}
