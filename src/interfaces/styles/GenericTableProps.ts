export interface Header {
  label: string | React.JSX.Element;
  key: string | null;
  sortable?: boolean;
}

export interface GenericTableProps<T> {
  headers: Header[];
  data: T[];
  renderRow: (item: T) => React.JSX.Element;
  itemsPerPage?: number;
  onSort?: (column: string) => void;
  sortBy?: string | null;
  sortOrder?: "asc" | "desc";
}

export interface TableHeaderProps {
  $sortable: boolean;
  $active?: boolean;
  $sortOrder?: "asc" | "desc";
}

export interface StatusBadgeProps {
  $status: string;
}

export interface PageButtonProps {
  $active?: boolean;
}

export interface StatusButtonRoomsProps {
  $status: "Available" | "Booked" | "In Progress";
}

export interface SortIconProps {
  $active: boolean;
  $sortOrder: "asc" | "desc";
}