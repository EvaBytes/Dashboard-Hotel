import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import bookingsData from "../data/Bookings.json";
import { GenericTable } from "../components/common/GenericTable.jsx";
import {TableData,GuestContainer,GuestImage,GuestInfo,ViewNotesButton,StatusBadge} from "../assets/TableStyles.js";

export const Bookings = () => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM do, yyyy hh:mm a");
  };

  const headers = [
    "Guest",
    "Order Date",
    "Check In",
    "Check Out",
    "Special Request",
    "Room Type",
    "Status",
  ];

  const renderRow = (booking) => (
    <>
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
            navigate(`/guest-details/${booking.guest.reservationNumber}`)
          }
        >
          View Notes
        </ViewNotesButton>
      </TableData>
      <TableData>{booking.roomType}</TableData>
      <TableData>
        <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
      </TableData>
    </>
  );

  return (
    <div>
      <GenericTable
        headers={headers}
        data={bookingsData}
        renderRow={renderRow}
        itemsPerPage={10} 
      />
    </div>
  );
};
