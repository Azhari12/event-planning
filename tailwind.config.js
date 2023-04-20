/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        button: "#19345E",
        body: "linear-gradient(269.71deg, #FFFFFF 68.03%, rgba(235, 235, 235, 0.96) 99.76%);",
      },
    },
  },
  plugins: [require("daisyui")],
};
