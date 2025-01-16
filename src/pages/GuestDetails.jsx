import React from "react";
import { useParams } from "react-router-dom";

const GuestDetails = ({ bookingData }) => {
  const { reservationId } = useParams();

  const guestDetails = bookingData.find(
    (booking) => booking.guest.reservationNumber === reservationId
  );

  if (!guestDetails) {
    return <div>Guest details not found</div>;
  }

  const { guest, orderDate, checkIn, checkOut, specialRequest, roomType, status } = guestDetails;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Guest Details</h1>
      <img
        src={guest.image}
        alt={guest.fullName}
        style={{ width: "100px", borderRadius: "5px", marginBottom: "1rem" }}
      />
      <p><strong>Name:</strong> {guest.fullName}</p>
      <p><strong>Reservation ID:</strong> {guest.reservationNumber}</p>
      <p><strong>Check-In:</strong> {checkIn}</p>
      <p><strong>Check-Out:</strong> {checkOut}</p>
      <p><strong>Room Type:</strong> {roomType}</p>
      <p><strong>Price</strong></p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Special Request:</strong> {specialRequest}</p>
    </div>
  );
};

export default GuestDetails;
