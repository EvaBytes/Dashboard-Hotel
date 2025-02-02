import styled from "styled-components";

export const NewRoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem auto;
  background-color: ${({ theme }) => theme?.palette?.background?.default || "#f9f9f9"};
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const RoomInfoCard = styled.div`
  flex: 2;
  background-color: ${({ theme }) => theme?.palette?.background?.paper || "#ffffff"};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RoomHeader = styled.div`
  h2 {
    font-size: ${({ theme }) => theme?.typography?.h2?.fontSize || "24px"};
    font-weight: ${({ theme }) => theme?.typography?.h2?.fontWeight || "600"};
    line-height: ${({ theme }) => theme?.typography?.h2?.lineHeight || "1.3"};
    color: ${({ theme }) => theme?.text?.primary || "#262626"};
  }
`;

export const RoomDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: ${({ theme }) => theme?.typography?.body1?.fontSize || "16px"};
    color: ${({ theme }) => theme?.palette?.text?.secondary || "#799283"};
    margin-bottom: 0.5rem;
  }

  input,
  textarea,
  select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: ${({ theme }) => theme?.styles?.button?.borderRadius || "8px"};
    font-size: ${({ theme }) => theme?.typography?.body1?.fontSize || "16px"};
  }

  textarea {
    resize: vertical;
  }
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

export const ImageUploadSection = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type="file"] {
    margin-top: 0.5rem;
    width: 100%;
  }
`;

export const ImagePreview = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  margin-right: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
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