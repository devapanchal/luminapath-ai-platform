export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101828",
        cloud: "#f7fbff",
        aurora: "#19c7b7",
        ember: "#ff8a4c",
        violet: "#7161ef",
        night: "#09111f"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 80px -36px rgba(25, 199, 183, 0.72)",
        panel: "0 24px 70px -48px rgba(9, 17, 31, 0.65)"
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(circle at 18% 12%, rgba(25,199,183,.18), transparent 31%), radial-gradient(circle at 88% 20%, rgba(255,138,76,.18), transparent 28%), linear-gradient(135deg, #f7fbff 0%, #eef7f3 45%, #fff4ec 100%)",
        "mesh-dark":
          "radial-gradient(circle at 18% 12%, rgba(25,199,183,.2), transparent 31%), radial-gradient(circle at 88% 20%, rgba(255,138,76,.16), transparent 28%), linear-gradient(135deg, #09111f 0%, #101828 52%, #1a2536 100%)"
      }
    }
  },
  plugins: []
};
