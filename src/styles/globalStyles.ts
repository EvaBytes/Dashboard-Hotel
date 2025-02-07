import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.palette.background.default};
    font-family: ${(props) => props.theme.typography.fontFamily};
    color: ${(props) => props.theme.palette.text.primary};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
