import { createTheme, styled } from "@mui/material/styles";

export const authTheme = createTheme({
  palette: {
    primary: {
      main: "#1E5631",
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
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
      color: "#333333",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export const StyledAuthButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.button.main, 
  color: theme.palette.common.white,
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark, 
  },
}));

export const StyledAuthContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
}));

