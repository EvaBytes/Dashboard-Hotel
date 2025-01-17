import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 3rem;
  font-size: 13px;
  text-align: left;
`;

export const TableHeader = styled.th`
  background-color: #FFFFFF;
  padding: 0.7rem;
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
  padding: 0.6rem;
  border-bottom: 1px solid #ddd;
  vertical-align: middle; 
  text-align: center; 
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

export const RoomImage = styled.img`
  width: 5rem;
  height: 3rem;
  border-radius: 8px;
  text-align: center; 
`;

export const GuestInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #333;

  small {
    color: #888;
  }
`;

export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0.2rem 0;
    font-size: 0.9rem;
    color: #555;
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;

  background-color: ${({ status }) => ({
    "Check-In": "#E8FFEE",
    "Check-Out": "#FFEDEC",
    Refund: "#ffea99",
  }[status] || "#17a2b8")}; 

  color: ${({ status }) => ({
    "Check-In": "#135846",
    "Check-Out": "#E23428",
    Refund: "#e0bc00",
  }[status] || "#ffffff")}; 
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 0;
`;

export const PageButton = styled.button.attrs((props) => ({
  "data-active": props.active, 
}))`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: ${({ "data-active": isActive }) => (isActive ? "#135846" : "white")};
  color: ${({ "data-active": isActive }) => (isActive ? "white" : "#000")};
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


export const ViewNotesButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.3rem 0.5rem;
  background-color: #EEF9F2;
  color: #212121;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #DFF4E4;
  }
`;

export const ArchiveButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #e23428; // Rojo para Archivar
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c21f1c;
  }
`;
