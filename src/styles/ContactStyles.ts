import styled from "styled-components";
import { TabButtonProps, ArchiveButtonProps, PageButtonProps } from "../interfaces/styles/ContactProps.ts";

export const ContactPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.4rem;
  margin-top: 3rem;
`;


export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #135846;
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
`;

export const TabButton = styled.button<TabButtonProps>`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: ${(props) => (props.$active ? "#135846" : "#777")};
  border-bottom: ${(props) => (props.$active ? "2px solid #135846" : "none")};
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};

  &:hover {
    color: #135846;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #135846;
  color: white;
`;

export const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

export const CustomerName = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
`;

export const CustomerEmail = styled.div`
  font-size: 0.9rem;
`;

export const CustomerPhone = styled.div`
  font-size: 0.85rem;
  color: #888;
`;

export const Subject = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
`;

export const Comment = styled.div`
  font-size: 0.9rem;
  color: #555;
`;

export const ArchiveButton = styled.button<ArchiveButtonProps>`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.$isArchived ? "#ffefef" : "#eef9f1")};
  color: ${(props) => (props.$isArchived ? "#d9534f" : "#5cb85c")};
  border: 1px solid ${(props) => (props.$isArchived ? "#d9534f" : "#5cb85c")};
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$isArchived ? "#f8d7da" : "#d4edda")};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const PageButton = styled.button<PageButtonProps>`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.$active ? "#135846" : "white")};
  color: ${(props) => (props.$active ? "white" : "#135846")};
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #135846;
    color: white;
  }
`;
