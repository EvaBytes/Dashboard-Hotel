import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: #fff;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.styles.button.borderRadius};
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.styles.button.hover.backgroundColor};
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