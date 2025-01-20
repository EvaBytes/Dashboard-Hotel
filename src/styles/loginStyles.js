import styled from "styled-components";

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("src/assets/img/Login.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 16px;
`;

export const StyledAuthContainer = styled.div`
  background-color: #ffffff;
  padding: 2rem .5rem;
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const StyledTextField = styled.input`
  width: 85%;
  padding: 1rem;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  margin: 10px 0;

  &:hover {
    border-color: #aaa;
  }
`;

export const StyledAuthButton = styled.button`
  width: 7.8rem;
  padding: 1.2rem;
  margin-top: 0.3rem;
  font-size: 16px;
  font-weight: bold;
  background-color: #799283;
  color: #ffffff;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #135846;
    color: #ffffff;
  }
`;

export const StyledSubtitle = styled.p`
  font-size: 1rem;
  color: #5D5449;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
`;

export const Typography = styled.h1`
  font-size: ${(props) => props.size || "1.5rem"};
  color: ${(props) => props.color || "#333"};
  margin: ${(props) => props.margin || "0 0 1rem 0"};
`;

export const Alert = styled.div`
  background-color: ${(props) => (props.type === "error" ? "#ffcccc" : "#ccffcc")};
  color: ${(props) => (props.type === "error" ? "#a10035" : "#006400")};
  border: 1px solid ${(props) => (props.type === "error" ? "#a10035" : "#006400")};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 16px;
  width: 100%;
  text-align: center;
`;

export const CircularProgress = styled.div`
  border: 4px solid #f3f3f3; /* Gris claro */
  border-top: 4px solid ${(props) => props.theme.palette.primary.main}; 
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
