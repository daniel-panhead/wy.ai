/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-light-green": "#F0F7F2",
        "brunswick-green": "#305F56",
        "brunswick-intense": "#314935",
        "sea-green": "#63926C",
        "honeydew": "#CFDED2",
        "cambridge-blue": "#A0BBA4",
        "element-bg": "#FFFEF6",
        "dark-grey": "#424242",
        "ash-grey": "#C2D6C6"
      }
    },
  },
  plugins: [],
}

