import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
`;

export const TableHeader = styled.th`
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 10px;
  border-bottom: 2px solid #ddd;
  text-align: left;
  font-weight: bold;
  color: #333;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableData = styled.td`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
`;

export const GuestContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GuestImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
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
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  background-color: ${({ status }) => {
    switch (status) {
      case "Booked":
        return "#28a745";
      case "Refund":
        return "#dc3545";
      case "Pending":
        return "#ffc107";
      case "Canceled":
        return "#6c757d";
      default:
        return "#17a2b8";
    }
  }};
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
