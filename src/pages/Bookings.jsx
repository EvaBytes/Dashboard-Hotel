import React, { useState } from "react";
import { format } from "date-fns";
import bookingsData from "../data/Bookings.json";
import { GenericTable } from "../components/common/GenericTable.jsx";
import {GenericButton} from "../components/common/GenericButton.jsx";
import {TableData,GuestContainer,GuestImage,GuestInfo,StatusBadge,} from "../assets/TableStyles.js";
import { Overlay, Popup, CloseButton } from "../assets/PopupStyles.js";


const NotesPopup = ({ isOpen, onClose, specialRequest }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Popup>
        <h3>Special Request</h3>
        <p>{specialRequest}</p>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Popup>
    </Overlay>
  );
};

export const Bookings = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentSpecialRequest, setCurrentSpecialRequest] = useState("");

  const openPopup = (specialRequest) => {
    setCurrentSpecialRequest(specialRequest);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentSpecialRequest("");
  };

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
        <GenericButton variant="default" onClick={() => openPopup(booking.specialRequest)}>
          View Notes
        </GenericButton>
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
      <NotesPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        specialRequest={currentSpecialRequest}
      />
    </div>
  );
};
