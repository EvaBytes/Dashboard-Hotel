import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookingsData from "../data/Bookings.json";
import {GuestDetailsContainer,GuestInfoCard,GuestImage,GuestName,GuestInfo,RoomDetailsCard,StatusBadge,RoomInfo,FacilitiesContainer,FacilityItem,BookedBanner,BreadcrumbContainer,BreadcrumbLink} from "../styles/GuestDetailsStyles";

const GuestDetails = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const guestDetails = bookingsData.find(
    (booking) => booking.guest.reservationNumber === reservationId
  );

  if (!guestDetails) {
    return <div>Guest details not found</div>;
  }

  const {
    guest,
    checkIn,
    checkOut,
    specialRequest,
    roomType,
    status,
    facilities,
    roomPhoto,
  } = guestDetails;

  return (
    <>
      <BreadcrumbContainer>
        <button onClick={() => navigate(-1)} style={{ all: "unset", cursor: "pointer" }}>
          &#8592;
        </button>
        <BreadcrumbLink to="/bookings">Guest</BreadcrumbLink> / {guest.fullName}
      </BreadcrumbContainer>

      {/* Main Guest Details */}
      <GuestDetailsContainer>
        <GuestInfoCard>
          <GuestImage src={guest.image} alt={guest.fullName} />
          <GuestName>{guest.fullName}</GuestName>
          <GuestInfo>ID: {guest.reservationNumber}</GuestInfo>
          <StatusBadge $status={status}>{status}</StatusBadge>
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
            <p>
              <strong>Special Request:</strong> {specialRequest}
            </p>
            <FacilitiesContainer>
              {facilities.split(",").map((facility) => (
                <FacilityItem key={facility}>{facility}</FacilityItem>
              ))}
            </FacilitiesContainer>
          </RoomInfo>
        </GuestInfoCard>

        <RoomDetailsCard>
          <BookedBanner>{status}</BookedBanner>
          <img
            src={roomPhoto}
            alt={`Room ${roomType}`}
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <div style={{ padding: "1rem" }}>
            <h3>{roomType} Room</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </RoomDetailsCard>
      </GuestDetailsContainer>
    </>
  );
};

export { GuestDetails };
