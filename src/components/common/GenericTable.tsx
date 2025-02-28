import React, { useState } from "react";
import { Table, TableHeader, TableRow, PaginationContainer, PageButton, SortIcon } from "../../styles/TableStyles";
import { GenericTableProps } from "../../interfaces/styles/GenericTableProps";

export const GenericTable = <T,>({ headers, data, renderRow, itemsPerPage = 10, onSort, sortBy, sortOrder }: GenericTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const visiblePages = 3;
  const startPage = Math.max(1, currentPage - visiblePages);
  const endPage = Math.min(totalPages, currentPage + visiblePages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div>
      <Table>
        <thead>
          <TableRow>
            {headers.map((header, index) => (
              <TableHeader
                key={index}
                $sortable={!!header.key} 
                onClick={() => header.key && onSort && onSort(header.key)}
                $active={sortBy === header.key}
                $sortOrder={sortOrder}
              >
                {header.label} 
                {header.key && (
                  <SortIcon $active={sortBy === header.key} $sortOrder={sortOrder || "asc"}>
                    {sortBy === header.key && (sortOrder === "asc" ? "↑" : "↓")}
                  </SortIcon>
                )}
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <TableRow key={index}>{renderRow(item)}</TableRow>
          ))}
        </tbody>
      </Table>

      <PaginationContainer>
        <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </PageButton>
        {pageNumbers.map((page) => (
          <PageButton
            key={page}
            $active={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        ))}
        <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </PageButton>
      </PaginationContainer>
    </div>
  );
};