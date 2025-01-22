import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme: $theme }) => $theme.palette.background.paper};
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-family: ${({ theme: $theme }) => $theme.typography.fontFamily};
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme: $theme }) => $theme.palette.text.primary};
  font-size: ${({ theme: $theme }) => $theme.typography.body1.fontSize};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme: $theme }) => $theme.styles.button.padding};
  border: 1px solid #ccc;
  border-radius: ${({ theme: $theme }) => $theme.styles.button.borderRadius};
  font-size: ${({ theme: $theme }) => $theme.typography.body1.fontSize};
  color: ${({ theme: $theme }) => $theme.palette.text.primary};
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme: $theme }) => $theme.styles.button.padding};
  border: 1px solid #ccc;
  border-radius: ${({ theme: $theme }) => $theme.styles.button.borderRadius};
  font-size: ${({ theme: $theme }) => $theme.typography.body1.fontSize};
  color: ${({ theme: $theme }) => $theme.palette.text.primary};
  resize: vertical;
`;

export const SubmitButton = styled.button`
  background-color: ${({ theme: $theme }) => $theme.palette.secondary.main};
  color: ${({ theme: $theme }) => $theme.palette.primary.main};
  padding: ${({ theme: $theme }) => $theme.styles.button.padding};
  border: none;
  border-radius: ${({ theme: $theme }) => $theme.styles.button.borderRadius};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme: $theme }) =>
      $theme.styles.button.hover.backgroundColor};
    color: ${({ theme: $theme }) => $theme.styles.button.hover.color};
  }

  &:disabled {
    background-color: ${({ theme: $theme }) =>
      $theme.styles.button.disabled.backgroundColor};
    color: ${({ theme: $theme }) => $theme.styles.button.disabled.color};
  }
`;

export const BackButton = styled.button`
  background-color: ${({ theme: $theme }) => $theme.palette.background.default};
  color: ${({ theme: $theme }) => $theme.palette.text.secondary};
  padding: ${({ theme: $theme }) => $theme.styles.button.padding};
  border: none;
  border-radius: ${({ theme: $theme }) => $theme.styles.button.borderRadius};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme: $theme }) =>
      $theme.styles.button.hover.backgroundColor};
    color: ${({ theme: $theme }) => $theme.palette.primary.main};
  }

  &:disabled {
    background-color: ${({ theme: $theme }) =>
      $theme.styles.button.disabled.backgroundColor};
    color: ${({ theme: $theme }) => $theme.styles.button.disabled.color};
  }
`;
