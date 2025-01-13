import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF", 
    },
    secondary: {
      main: "#A10035",
    },
    background: {
      default: "#F9F9F9", 
      paper: "#FFFFFF", 
    },
    text: {
      primary: "#333333", 
      secondary: "#666666", 
    },

    button: {
      main: "#EBF1EF", // Agregar el color aquí
    },
    
    success: {
      main: "#4CAF50", 
    },
    error: {
      main: "#F44336", 
    },
    
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      color: "#333333",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#666666",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "10px 20px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E5631", 
        },
      },
    },
  },
});

export {theme};
