import React from "react";
import { useParams } from "react-router-dom";
import bookingsData from "../data/Bookings.json"; 
import {GuestDetailsContainer,GuestInfoCard,GuestImage,GuestName,GuestInfo,RoomDetailsCard,RoomInfo,StatusBadge,PriceTag,BookedBanner,} from "../assets/GuestDetailsStyles";

const GuestDetails = () => {
  const { reservationId } = useParams();
  console.log("Reservation ID from URL:", reservationId);

  const guestDetails = bookingsData.find(
    (booking) => booking.guest.reservationNumber === reservationId
  );
  console.log("Guest Details:", guestDetails);

  if (!guestDetails) {
    return <div>Guest details not found</div>;
  }

  const { guest, checkIn, checkOut, specialRequest, roomType, status } = guestDetails;

  return (
    <GuestDetailsContainer>
      <GuestInfoCard>
        <GuestImage src={guest.image} alt={guest.fullName} />
        <GuestName>{guest.fullName}</GuestName>
        <GuestInfo>ID: {guest.reservationNumber}</GuestInfo>
        <StatusBadge status={status}>{status}</StatusBadge>
        <RoomInfo>
          <p>
            <strong>Check-In:</strong> {checkIn}
          </p>
          <p>
            <strong>Check-Out:</strong> {checkOut}
          </p>
          <p>
            <strong>Room Type:</strong> {roomType}
          </p>
          <PriceTag>$145 / night</PriceTag>
          <p>
            <strong>Special Request:</strong> {specialRequest}
          </p>
        </RoomInfo>
      </GuestInfoCard>
      <RoomDetailsCard>
        <BookedBanner>BOOKED</BookedBanner>
        <div style={{ flex: 1 }}>
          <p>Bed Room</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </RoomDetailsCard>
    </GuestDetailsContainer>
  );
};

export { GuestDetails };
