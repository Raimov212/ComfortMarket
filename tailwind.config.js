/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: { min: "360px", max: "480px" },
        md: { min: "481px", max: "768px" },
        lg: { min: "769px", max: "1279px" },
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      colors: {
        primary: "#6945FF",
        secondary: "#FF6B55",
        buttonColor: "#4CAF50",
      },
      textColor: {
        one: "#4F4F4F",
        two: "#6C7177DE",
        three: "#A7A8AA",
        foo: "#FF6B55",
      },
      borderColor: {
        one: "#DBDBDB",
        two: "#03A9F4",
      },
      backgroundColor: {
        one: "#DBDBDB",
      },
    },
  },
  plugins: [],
};
