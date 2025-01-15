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
  padding: 1.2rem;
  margin: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const StyledTextField = styled.input`
  width: 90%;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ffffff;
  margin: 10px 0;

  &:hover {
    border-color: #00000014;
  }
`;

export const EmailField = (props) => (
  <StyledTextField type="email" placeholder="Email" {...props} />
);

export const PasswordField = (props) => (
  <StyledTextField type="password" placeholder="Password" {...props} />
);

export const StyledAuthButton = styled.button`
  width: 7.8rem;
  padding: 1rem;
  margin-top: 0.3rem;
  font-weight: bold;
  background-color: #135846;
  color: #ffffff;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
    color: #135846;
  }
`;

export const StyledSubtitle = styled.p`
  font-size: 1rem;
  color: #a10035;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
`;
