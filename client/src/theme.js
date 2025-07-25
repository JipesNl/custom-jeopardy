import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#003366", // Deep Jeopardy blue
    },
    secondary: {
      main: "#FFCC00", // Gold/yellow
    },
    background: {
      // default: "#001f3f", // Dark blue
      // paper: "#002b5c",
      default: "#07070a",
      paper: "#000692",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Oswald', sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      textTransform: "uppercase",
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      fontSize: "1.2rem",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#002b5c",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Korinna';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url('/fonts/Korinna-Regular.ttf');
        format('truetype');
      }
      `,
    },
  },
});

export default theme;
