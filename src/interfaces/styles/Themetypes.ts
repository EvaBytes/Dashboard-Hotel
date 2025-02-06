export interface ThemeType {
    mode: "light" | "dark";
    palette: {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
      background: {
        default: string;
        paper: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
    };
    typography: {
      fontFamily: string;
      h1: {
        fontSize: string;
        fontWeight: number;
        lineHeight: string;
        letterSpacing: string;
      };
      h2: {
        fontSize: string;
        fontWeight: number;
        lineHeight: string;
        letterSpacing: string;
      };
      body1: {
        fontSize: string;
        lineHeight: string;
        color: string;
      };
      body2: {
        fontSize: string;
        lineHeight: string;
        color: string;
      };
    };
    styles: {
      button: {
        borderRadius: string;
        padding: string;
        hover: {
          backgroundColor: string;
          color: string;
        };
        disabled: {
          backgroundColor: string;
          color: string;
        };
      };
    };
  }
  