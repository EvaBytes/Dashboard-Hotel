import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 12px;
  text-align: left;
`;

export const TableHeader = styled.th`
  background-color: #FFFFFF;
  padding: 0.5rem;
  border-bottom: 2px solid #ddd;
  text-align: center;
  font-weight: bold;
  color: #333;

  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
  }
`;


export const TableRow = styled.tr`
  background-color: #FFFFFF;
  
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableData = styled.td`
  padding: .6rem;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
`;

export const GuestContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GuestImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 8px;
  margin-right: 10px;
`;

export const GuestInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #333;

  small {
    color: #888;
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;

  /* Definimos los colores en un objeto de mapeo */
  background-color: ${({ status }) => ({
    "Check-In": "#E8FFEE",
    "Check-Out": "#E2E2E2",
    Refund: "#FFEDEC",
  }[status] || "#17a2b8")}; 

  color: ${({ status }) => ({
    "Check-In": "#135846",
    "Check-Out": "#6c757d",
    Refund: "#dc3545",
  }[status] || "#ffffff")}; 
`;


export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 0;
`;

export const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: ${({ active }) => (active ? "#135846" : "white")};
  color: ${({ active }) => (active ? "white" : "#000")};
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #f4f4f4;
    color: #aaa;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #135846;
    color: white;
  }
`;
