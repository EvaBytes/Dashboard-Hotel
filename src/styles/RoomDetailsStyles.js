import styled from "styled-components";

export const RoomDetailsContainer = styled.div`
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 2rem auto;
`;

export const RoomDetailsCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

export const RoomDetailsHeader = styled.div`
  margin-bottom: 2rem;
  h2 {
    font-size: 1.5rem;
    color: #333;
    margin: 0;
  }
`;

export const RoomDetailsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RoomDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: 1rem;
    color: #555;
    font-weight: 500;
  }

  input,
  select,
  textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
    &:focus {
      outline: none;
      border-color: green;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const SaveButton = styled.button`
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

export const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: 1rem;
    color: #555;
    font-weight: 500;
  }

  div {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

export const ImagePreview = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  margin: .5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const AmenitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const AmenityItem = styled.div`
  padding: 0.5rem 1rem;
  border: 2px solid ${({ $selected, theme }) => ($selected ? theme?.palette?.secondary?.main : "#ccc")};
  border-radius: ${({ theme }) => theme?.styles?.button?.borderRadius || "8px"};
  cursor: pointer;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme?.palette?.secondary?.main : "transparent"};
  color: ${({ $selected, theme }) =>
    $selected ? theme?.palette?.primary?.main : theme?.palette?.text?.secondary};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme?.palette?.secondary?.main};
    background-color: ${({ theme }) => theme?.palette?.secondary?.main};
    color: ${({ theme }) => theme?.palette?.primary?.main};
  }
`;