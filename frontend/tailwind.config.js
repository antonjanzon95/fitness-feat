/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        tablet: "640px",
        laptop: "768px",
      },
    },
  },
  plugins: [],
};
