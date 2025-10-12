/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(18, 18, 18, 0.97)",
        surface1: "#232323",
        surface2: "#353535",
        primary: "#FFE81F",
        "text-onBackground": "#CECECE",
        "text-onSurface": "#DFDFDF",
        "text-onPrimary": "#20182B",
        "text-onDisabled": "rgba(255, 255, 255, 0.32)",
        success: "#03DAC6",
        error: "#C47768",
        focused: "#FFE81F",
        enabled: "rgba(255, 232, 31, 0.30)",
        disabled: "rgba(255, 255, 255, 0.12)",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 40px 0 rgba(0, 0, 0, 0.30)",
        button: "0 2px 12px 0 rgba(0, 0, 0, 0.20)",
        tag: "2px 2px 4px 0 rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
