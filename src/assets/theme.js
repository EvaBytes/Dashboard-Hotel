import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#135846",
    },
    background: {
      default: "#f9f9f9", 
      paper: "#ffffff", 
    },
    text: {
      primary: "##262626", 
      secondary: "#799283", 
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", 
    h1: {
      fontSize: "32px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "24px",
      fontWeight: 600,
    },
    body1: {
      fontSize: "16px",
      color: "#333333", 
    },
    body2: {
      fontSize: "8px",
      color: "#666666", 
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        
        body: {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          backgroundColor: "#f9f9f9", 
          fontFamily: "Roboto, Arial, sans-serif", 
          color: "#333333", 
        },
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", 
          padding: ".6rem 1.5rem", 
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#333333", 
        },
      },
    },
  },
});
