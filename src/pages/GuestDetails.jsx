import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns"; 
import bookingsData from "../data/Bookings.json";
import {GuestDetailsContainer,GuestInfoCard,GuestImage,GuestName,GuestInfo,RoomDetailsCard,StatusBadge,RoomInfo, FacilitiesContainer,FacilityItem,BookedBanner,BreadcrumbContainer,BreadcrumbLink} from "../styles/GuestDetailsStyles";

const GuestDetails = () => {
  const { reservationId } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();

  const guestDetails = bookingsData.find(
    (booking) => booking.guest.reservationNumber === reservationId
  );

  useEffect(() => {
    if (guestDetails) {
      navigate(location.pathname, {
        replace: true,
        state: { guestName: guestDetails.guest.fullName },
      });
    }
  }, [guestDetails, navigate, location.pathname]);

  if (!guestDetails) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>Guest details not found.</p>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    guest,
    checkIn,
    checkOut,
    specialRequest,
    roomType,
    offerPrice,
    status,
    facilities,
    roomPhoto,
  } = guestDetails;

  return (
    <>
      <BreadcrumbContainer>
        <button
          onClick={() => navigate(-1)}
          style={{ all: "unset", cursor: "pointer", marginRight: "8px" }}
        >
          &#8592;
        </button>
        <BreadcrumbLink to="/bookings">Bookings</BreadcrumbLink> /{" "}
        <span>{guest.fullName}</span>
      </BreadcrumbContainer>

      <GuestDetailsContainer>
        <GuestInfoCard>
          <GuestImage src={guest.image} alt={guest.fullName} />
          <GuestName>{guest.fullName}</GuestName>
          <GuestInfo>ID: {guest.reservationNumber}</GuestInfo>
          <StatusBadge $status={status}>{status}</StatusBadge>
          <RoomInfo>
            <p>
              <strong>Check-In:</strong>{" "}
              {format(new Date(checkIn), "MMM dd, yyyy")}
            </p>
            <p>
              <strong>Check-Out:</strong>{" "}
              {format(new Date(checkOut), "MMM dd, yyyy")}
            </p>
            <p>
              <strong>Room Type:</strong> {roomType}
            </p>
            <p>
              <strong>Room Price:</strong> {offerPrice}
            </p>
            <p>
              <strong>Special Request:</strong> {specialRequest || "None"}
            </p>
            <FacilitiesContainer>
              {facilities?.split(",").map((facility) => (
                <FacilityItem key={facility.trim()}>{facility.trim()}</FacilityItem>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </RoomDetailsCard>
      </GuestDetailsContainer>
    </>
  );
};

export { GuestDetails };
