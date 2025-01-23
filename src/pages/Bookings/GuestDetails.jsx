import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import bookingsData from "../../data/Bookings.json";
import {GuestDetailsContainer,GuestInfoCard,GuestImage,GuestHeader,GuestNameDetails,GuestActions,GuestInfoSection,RoomDetailsCard,StatusBadge,FacilitiesContainer,FacilityItem,CarouselWrapper,CarouselItem,CarouselImage,CarouselCaption,CarouselButtonLeft,CarouselButtonRight,Divider} from "../../styles/GuestDetailsStyles";
import { MdOutlinePhone, MdOutlineMailOutline } from "react-icons/md";

const GuestDetails = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === roomPhoto.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? roomPhoto.length - 1 : prevIndex - 1
    );
  };

  return (
    <>

      <GuestDetailsContainer>
      <GuestInfoCard>
          <GuestHeader>
            <GuestImage src={guest.image} alt={guest.fullName} />
            <GuestNameDetails>
              <h2>{guest.fullName}</h2>
              <p>ID: {guest.reservationNumber}</p>
            </GuestNameDetails>
          </GuestHeader>
          <GuestActions>
            <button>
              <MdOutlinePhone /> Call
            </button>
            <button>
              <MdOutlineMailOutline /> Send Message
            </button>
          </GuestActions>
          <Divider />
          <GuestInfoSection>
            <p>
              <strong>Check-In:</strong> {format(new Date(checkIn), "MMM dd, yyyy")}
            </p>
            <p>
              <strong>Check-Out:</strong> {format(new Date(checkOut), "MMM dd, yyyy")}
            </p>
          </GuestInfoSection>
          <Divider />
          <GuestInfoSection>
            <p>
              <strong>Room Type:</strong> {roomType}
            </p>
            <p>
              <strong>Room Price:</strong> {offerPrice}
            </p>
            <p>
              <strong>Special Request:</strong> {specialRequest || "None"}
            </p>
          </GuestInfoSection>
          <Divider />
          <FacilitiesContainer>
            {facilities?.split(",").map((facility) => (
              <FacilityItem key={facility.trim()}>{facility.trim()}</FacilityItem>
            ))}
          </FacilitiesContainer>
        </GuestInfoCard>


        <RoomDetailsCard>
          <StatusBadge $status={status}>{status}</StatusBadge> 
        <CarouselWrapper>
            <CarouselButtonLeft onClick={handlePrevImage}>&#8592;</CarouselButtonLeft>
            <CarouselItem>
              <CarouselImage
                src={roomPhoto[currentImageIndex]}
                alt={`Room ${roomType} - ${currentImageIndex + 1}`}
              />
              <CarouselCaption>
                <h3>{roomType} Room</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </CarouselCaption>
            </CarouselItem>
            <CarouselButtonRight onClick={handleNextImage}>&#8594;</CarouselButtonRight>
          </CarouselWrapper>
        </RoomDetailsCard>
      </GuestDetailsContainer>
    </>
  );
};

export { GuestDetails };
