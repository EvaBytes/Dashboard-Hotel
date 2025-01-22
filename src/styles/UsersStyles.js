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
  gap: .9rem;
`;

export const EmployeeImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius:10px;
  object-fit: cover;
`;

export const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
    font-size: .9rem;
    font-weight: bold;
  }

  p {
    margin: 0.2rem 0;
    font-size: .7rem;
    color: "#135846";
  }
`;

export const DescriptionText = styled.div`
  font-size: 0.8rem;
  color: #393939;

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
  font-size: 10px;
  margin: 0 1rem 0 0;
  color: ${({ $status }) =>
    $status === "ACTIVE"
      ? "green"
      : $status === "INACTIVE"
      ? "red"
      : "black"}; 
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
`;
