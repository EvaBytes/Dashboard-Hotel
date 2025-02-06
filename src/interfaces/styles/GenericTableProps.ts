import React from "react";
import { User } from "../users/UsersState.ts";

export interface Header {
  label: string;
  key: string | null;
}

export interface GenericTableProps {
  headers: Header[];
  data: User[];
  renderRow: (item: User) => React.ReactNode;
  itemsPerPage?: number;
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

export interface StatusButtonProps {
  $status: "Available" | "Unavailable";
}

export interface SortIconProps {
  $active: boolean;
  $sortOrder: "asc" | "desc";
}