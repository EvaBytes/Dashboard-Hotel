import styled from "styled-components";

export const FormContainer = styled.div`
  margin: 4rem auto;
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
  background-color: ${({ theme }) => theme?.palette?.secondary?.main || "#135846"};
  color: ${({ theme }) => theme?.palette?.primary?.main || "#FFFFFF"};
  padding: ${({ theme }) => theme?.styles?.button?.padding || ".6rem 1.5rem"};
  border: none;
  border-radius: ${({ theme }) => theme?.styles?.button?.borderRadius || "8px"};
  font-size: ${({ theme }) => theme?.typography?.body1?.fontSize || "16px"};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme?.styles?.button?.hover?.backgroundColor || "#0f4a3c"};
    color: ${({ theme }) => theme?.styles?.button?.hover?.color || "#ffffff"};
  }
`;

export const BackButton = styled.button`
  background-color: ${({ theme }) => theme?.palette?.background?.default || "#f9f9f9"};
  color: red;
  padding: ${({ theme }) => theme?.styles?.button?.padding || ".6rem 1.5rem"};
  font-size: ${({ theme }) => theme?.typography?.body1?.fontSize || "16px"};
  margin-left: 1rem;
  border: none;
  border-radius: ${({ theme }) => theme?.styles?.button?.borderRadius || "8px"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: red;
    color: white;
  }
`;
