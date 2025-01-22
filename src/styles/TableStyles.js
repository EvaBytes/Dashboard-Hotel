import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
  font-size: 14px;
  text-align: left;

  th,
  td {
    border-bottom: 1px solid ${(props) => props.theme.palette.background.paper};
  }
`;

export const TableHeader = styled.th`
  background-color: ${(props) => props.theme.palette.background.default};
  padding: 1rem;
  border-bottom: 2px solid ${(props) => props.theme.palette.background.paper};
  text-align: left;
  font-weight: bold;
  color: #393939 ;
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

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;

  background-color: ${({ $status }) =>
    ({
      "Check-In": "#E8FFEE",
      "Check-Out": "#FFEDEC",
      "In Progress": "#FFFAE5",
    }[$status] || "#17a2b8")};

  color: ${({ $status }) =>
    ({
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

export const PageButton = styled.button.attrs((props) => ({
  "data-active": props.$active,
}))`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid ${(props) => props.theme.palette.background.paper};
  background-color: ${({ "data-active": isActive, theme }) =>
    isActive ? theme.palette.secondary.main : theme.palette.background.default};
  color: ${({ "data-active": isActive, theme }) =>
    isActive ? theme.palette.primary.main : theme.palette.text.primary};
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
  padding: 0.5rem 1rem;
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

export const SortIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-left: 0.5rem;
  color: ${(props) => (props.$active ? props.theme.palette.text.primary : "#ccc")};
  transition: color 0.2s ease, transform 0.2s ease;

  svg {
    font-size: 1rem;
    color: inherit;
    transform: ${(props) => (props.$sortOrder === "desc" ? "rotate(180deg)" : "none")};
  }
`;

export const RoomImage = styled.img`
  width: 5rem;
  height: 3rem;
  border-radius: 8px;
`;

export const DiscountSpan = styled.span`
  color: #e23428;
  font-size: 0.9rem;
`;

export const StatusButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ $status }) =>
    $status === "Available" ? "#E8FFEE" : "#FFEDEC"};
  color: ${({ $status }) =>
    $status === "Available" ? "#135846" : "#E23428"};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
`;

