export const theme = {
  mode: "light", 
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
      primary: "#262626",
      secondary: "#799283",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: "1.2",
      letterSpacing: ".5px",
    },
    h2: {
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "1.3",
      letterSpacing: ".3px",
    },
    body1: {
      fontSize: "16px",
      lineHeight: "1.5",
      color: "#333333",
    },
    body2: {
      fontSize: "8px",
      lineHeight: "1.4",
      color: "#666666",
    },
  },
  styles: {
    button: {
      borderRadius: "8px",
      padding: ".6rem 1.5rem",
      hover: {
        backgroundColor: "#135846",
        color: "#ffffff",
      },
      disabled: {
        backgroundColor: "#E0E0E0",
        color: "#A0A0A0",
      },
    },
  },
};
