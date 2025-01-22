import styled from "styled-components";

export const NewRoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4rem 2rem;;
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

  div {
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme?.palette?.background?.default || "#f9f9f9"};
    color: ${({ theme }) => theme?.palette?.secondary?.main || "#135846"};
    border-radius: ${({ theme }) => theme?.styles?.button?.borderRadius || "8px"};
    font-size: ${({ theme }) => theme?.typography?.body2?.fontSize || "12px"};
  }
`;

export const SaveButton = styled.button`
  background-color: ${({ theme }) => theme?.palette?.secondary?.main || "#135846"};
  color: ${({ theme }) => theme?.palette?.primary?.main || "#FFFFFF"};
  padding: ${({ theme }) => theme?.styles?.button?.padding || "0.6rem 1.5rem"};
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
