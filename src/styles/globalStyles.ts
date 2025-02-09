import { createGlobalStyle } from "styled-components";
import Swal from "sweetalert2";

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

  .swal2-popup {
    background-color: white; 
    color: #799283;
    border-radius: 12px;
  }

  .swal2-title {
    color: #0e4636 ;
    font-size: 20px;
  }

  .swal2-confirm {
    background-color: #0e4636 ; 
    color: white;
    border-radius: 8px;
  }

  .swal2-cancel {
    background-color: #dc3545 ;
    color: white ;
    border-radius: 8px;
  }
`;

export const StyledSwal = Swal.mixin({
  customClass: {
    popup: "swal2-popup",
    title: "swal2-title",
    confirmButton: "swal2-confirm",
    cancelButton: "swal2-cancel",
  },
  buttonsStyling: false,
});
