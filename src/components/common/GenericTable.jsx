import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableData } from "../../assets/TableStyles.js";
import { PaginationContainer, PageButton } from "../../assets/TableStyles.js"; 

const GenericTable = ({ headers, data, renderRow, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const visiblePages = 3;
  const startPage = Math.max(1, currentPage - visiblePages);
  const endPage = Math.min(totalPages, currentPage + visiblePages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div>
      <Table>
        <thead>
          <TableRow>
            {headers.map((header, index) => (
              <TableHeader key={index}>{header}</TableHeader>
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
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </PageButton>
        {startPage > 1 && <span>...</span>}
        {pageNumbers.map((page) => (
          <PageButton
            key={page}
            onClick={() => handlePageChange(page)}
            data-active={currentPage === page}
          >
            {page}
          </PageButton>
        ))}
        {endPage < totalPages && <span>...</span>}
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </PaginationContainer>
    </div>
  );
};

export { GenericTable };
