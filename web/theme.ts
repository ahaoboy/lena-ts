import { createTheme } from "@mui/material";

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: {
      palette: {
        primary: { main: "#ec048e" },
        background: { default: "#0d1117", paper: "#161b22" },
      },
    },
    light: {
      palette: {
        primary: { main: "#d6007e" },
        background: { default: "#ffffff", paper: "#f6f8fa" },
      },
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: "uppercase",
          fontSize: "0.7rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: "uppercase",
        },
      },
    },
  },
});

export default theme;
