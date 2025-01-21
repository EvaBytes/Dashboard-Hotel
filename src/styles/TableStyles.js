import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
  font-size: 13px;
  text-align: left;
`;

export const TableHeader = styled.th`
  background-color: ${(props) => props.theme.palette.primary.main};
  padding: 0.7rem;
  border-bottom: 2px solid ${(props) => props.theme.palette.background.paper};
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.primary};
  cursor: ${(props) => (props.sortable ? "pointer" : "default")};
  user-select: none;

  &:first-child {
    border-top-left-radius: 10px;
  }

  &:last-child {
    border-top-right-radius: 10px;
  }

  svg {
    font-size: 0.9rem; /* Ajusta el tamaño del ícono */
    margin-left: 5px;
    color: ${(props) => (props.active ? props.theme.palette.text.primary : "#ccc")};
    transition: transform 0.2s ease;
    transform: ${(props) => (props.sortOrder === "desc" ? "rotate(180deg)" : "none")};
  }
`;

export const TableRow = styled.tr`
  background-color: ${(props) => props.theme.palette.primary.main};

  &:hover {
    background-color: ${(props) => props.theme.palette.background.default};
  }
`;

export const TableData = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.palette.background.paper};
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
  font-weight: bold;
  color: #393939;

  small {
    font-weight: normal;
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0.2rem 0;
    font-size: 0.9rem;
    color: "#135846";
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;

  background-color: ${({ status }) =>
    ({
      "Check-In": "#E8FFEE",
      "Check-Out": "#FFEDEC",
      Refund: "#ffea99",
    }[status] || "#17a2b8")};

  color: ${({ status }) =>
    ({
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
  border: 1px solid ${(props) => props.theme.palette.background.paper};
  background-color: ${({ "data-active": isActive, theme }) =>
    isActive ? theme.palette.secondary.main : theme.palette.primary.main};
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
  margin-top: 0.5rem;
  padding: ${(props) => props.theme.styles.button.padding};
  background-color: ${(props) => props.theme.styles.button.hover.backgroundColor};
  color: ${(props) => props.theme.palette.primary.main};
  border: none;
  border-radius: ${(props) => props.theme.styles.button.borderRadius};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.palette.secondary.main};
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

export const SortIcon = styled.span`
  margin-left: 0.5rem;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  color: ${(props) => (props.active ? props.theme.palette.text.primary : "#ccc")};
  transition: transform 0.2s ease;

  svg {
    font-size: 0.9rem;
    color: inherit;
  }
`;
