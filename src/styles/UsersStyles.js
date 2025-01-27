import styled from "styled-components";

export const TableData = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  vertical-align: top;
  white-space: nowrap;

  &:nth-child(1) {
    width: 25%;
  }

  &:nth-child(2) {
    width: 30%;
    overflow: hidden;
  }

  &:nth-child(3) {
    width: 20%;
  }

  &:nth-child(4) {
    width: 25%;
  }
`;

export const EmployeeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

export const EmployeeImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 10px;
  object-fit: cover;
`;

export const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: bold;
  }

  p {
    margin: 0.2rem 0;
    font-size: 10px;
    color: #393939 ;
  }
`;

export const DescriptionText = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #393939 ;
`;

export const ContactText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; 
  font-size: 0.8rem;
  color: #393939;
`;

export const StatusText = styled.span`
  font-weight: bold;
  font-size: 12px;
  margin: 0 1rem 0 0;
  color: ${({ $status, $theme }) =>
    $status === "ACTIVE"
      ? "green"
      : $status === "INACTIVE"
      ? "red"
      : $theme.palette.text.primary};
`;

export const DotsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

export const ActionMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.background.default};
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: .5rem;
  min-width: 120px;
`;

export const ActionMenuItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.primary};

  svg {
    width: 1rem; // Tamaño de los íconos
    height: 1rem; // Tamaño de los íconos
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.default};
  }
`;