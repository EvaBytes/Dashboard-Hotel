import styled from "styled-components";

export const TableData = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  vertical-align: top;
  text-align: left;
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
    font-size: 1rem;
    font-weight: bold;
  }

  p {
    margin: 0.2rem 0;
    font-size: .7rem;
    color: #555;
  }
`;

export const StatusText = styled.span`
  font-weight: bold;
  font-size: 10px;
  margin-right: 1rem;
  color: ${({ status }) => (status === "ACTIVE" ? "green" : "red")};
`;