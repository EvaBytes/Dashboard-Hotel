import styled from "styled-components";
import { TableHeaderProps, StatusBadgeProps, PageButtonProps, SortIconProps, StatusButtonRoomsProps } from "../interfaces/styles/GenericTableProps";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
  font-size: 14px;
  text-align: left;

  th, td {
    border-bottom: 1px solid ${(props) => props.theme.palette.background.paper};
  }
`;

export const TableHeader = styled.th<TableHeaderProps>`
  background-color: ${(props) => props.theme.palette.background.default};
  padding: 0.8rem;
  border-bottom: 2px solid ${(props) => props.theme.palette.background.paper};
  text-align: left;
  font-weight: bold;
  color: ${(props) => (props.$active ? props.theme.palette.text.primary : "#393939")};
  cursor: ${(props) => (props.$sortable ? "pointer" : "default")};
  user-select: none;

  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
  }

  svg {
    font-size: 0.9rem;
    margin-left: 5px;
    color: ${(props) => (props.$active ? props.theme.palette.text.primary : "#ccc")};
    transition: transform 0.2s ease;
    transform: ${(props) => (props.$sortOrder === "desc" ? "rotate(180deg)" : "none")};
  }
`;

export const TableRow = styled.tr`
  background-color: ${(props) => props.theme.palette.background.default};
  &:hover {
    background-color: ${(props) => props.theme.palette.background.paper};
  }
`;

export const TableData = styled.td`
  padding: 1rem;
  vertical-align: middle;
  text-align: left;

  &:first-child {
    display: flex;
    align-items: center;
  }
`;

export const GuestContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GuestImage1 = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 10px;
  margin-right: 1rem;
`;

export const GuestImage = styled.img`
  width: 4.7rem;
  height: 3.5rem;
  border-radius: 10px;
  margin-right: 1rem;
`;

export const GuestInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: bold;
  color: #393939;

  small {
    font-weight: normal;
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;

  background-color: ${({ $status }) =>
    ({
      "Available": "#E8FFEE",
      "Booked": "#FFEDEC",
      "Check-In": "#E8FFEE",
      "Check-Out": "#FFEDEC",
      "In Progress": "#FFFAE5",
    }[$status] || "#17a2b8")};

  color: ${({ $status }) =>
    ({
      "Available": "#135846",
      "Booked": "#E23428",
      "Check-In": "#135846",
      "Check-Out": "#E23428",
      "In Progress": "#e0bc00",
    }[$status] || "#ffffff")};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 0;
`;

export const PageButton = styled.button<PageButtonProps>`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid ${(props) => props.theme.palette.background.paper};
  background-color: ${({ $active, theme }) =>
    $active ? theme.palette.secondary.main : theme.palette.background.default};
  color: ${({ $active, theme }) =>
    $active ? theme.palette.primary.main : theme.palette.text.primary};
  border-radius: ${(props) => props.theme.styles.button.borderRadius};
  cursor: pointer;

  &:disabled {
    background-color: ${(props) => props.theme.styles.button.disabled.backgroundColor};
    color: ${(props) => props.theme.styles.button.disabled.color};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.styles.button.hover.backgroundColor};
    color: ${(props) => props.theme.styles.button.hover.color};
  }
`;

export const ViewNotesButton = styled.button`
  padding: 0.3rem 0.8rem;
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.text.primary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.dark};
  }
`;

export const SortIcon = styled.span<SortIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-left: 0.5rem;
  width: 16px; 
  color: ${(props) => (props.$active ? props.theme.palette.text.primary : "#ccc")};
  transition: color 0.2s ease, transform 0.2s ease;

  svg {
    font-size: 1rem;
    color: inherit;
    transform: ${(props) => (props.$sortOrder === "desc" ? "rotate(180deg)" : "none")};
  }
`;
export const RoomImage = styled.img`
  width: 6.5rem;
  height: 4rem;
  border-radius: 8px;
`;
export const DiscountSpan = styled.span`
  display: block;
  color: #e23428;
  font-size: .7rem;
  margin-top: 2px;
`;

export const StatusButton = styled.button<StatusButtonRoomsProps>`
  background-color: ${({ $status }) => $status === "Available" ? "#E8FFEE" : "#FFEDEC"};
  color: ${({ $status }) => $status === "Available" ? "#135846" : "#E23428"};
  padding: ${({ theme }) => theme?.styles?.button?.padding || "0.6rem 1.5rem"};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ActionMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 4px;
  width: 150px;
`;

export const ActionMenuItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  color: #333;
  font-size: 12px;
  border-bottom: 1px solid #f1f1f1;

  &:hover {
    background-color: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }

  display: flex;
  align-items: center;
  gap: 8px;
`;