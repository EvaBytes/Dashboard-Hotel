import styled from "styled-components";

export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  background-color: ${({ variant }) => {
    switch (variant) {
      case "available":
        return "#E8FFEE"; 
      case "booked":
        return "#FFEDEC"; 
      case "default":
      default:
        return "#EEF9F2"; 
    }
  }};

  color: ${({ variant }) => {
    switch (variant) {
      case "available":
        return "#135846"; 
      case "booked":
        return "#E23428"; 
      case "default":
      default:
        return "#212121"; 
    }
  }};

  &:hover {
    background-color: ${({ variant }) => {
      switch (variant) {
        case "available":
          return "#DFF4E4"; 
        case "booked":
          return "#FFD2D2"; 
        case "default":
        default:
          return "#DFF4E4"; 
      }
    }};
  }
`;
