import React, { useState } from "react";
import { format } from "date-fns";
import bookingsData from "../data/Bookings.json";
import {Table,TableHeader,TableRow,TableData,StatusBadge,PaginationContainer,PageButton,GuestContainer,GuestImage,GuestInfo,ViewNotesButton} from "../assets/BookingStyles";

export const Bookings = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = bookingsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = bookingsData.slice(startIndex, endIndex);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM do, yyyy hh:mm a"); 
  };

  return (
    <div>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Guest</TableHeader>
            <TableHeader>Order Date</TableHeader>
            <TableHeader>Check In</TableHeader>
            <TableHeader>Check Out</TableHeader>
            <TableHeader>Special Request</TableHeader>
            <TableHeader>Room Type</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentData.map((booking, index) => (
            <TableRow key={index}>
              <TableData>
                <GuestContainer>
                  <GuestImage src={booking.guest.image} alt="Guest" />
                  <GuestInfo>
                    {booking.guest.fullName}
                    <br />
                    <small>{booking.guest.reservationNumber}</small>
                  </GuestInfo>
                </GuestContainer>
              </TableData>
              <TableData>{formatDate(booking.orderDate)}</TableData>
              <TableData>{formatDate(booking.checkIn)}</TableData>
              <TableData>{formatDate(booking.checkOut)}</TableData>
              <TableData>
                <ViewNotesButton
                  onClick={() =>
                    window.location.href = `/guest-details/${booking.guest.reservationNumber}`
                  }
                >
                  View Notes
                </ViewNotesButton>
              </TableData>
              <TableData>{booking.roomType}</TableData>
              <TableData>
                <StatusBadge status={booking.status}>
                  {booking.status}
                </StatusBadge>
              </TableData>
            </TableRow>
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
            active={currentPage === page}
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
