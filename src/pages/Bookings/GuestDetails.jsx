import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingById } from "../../redux/slices/bookingsSlice.js"; 
import { format } from "date-fns";
import { MdOutlinePhone, MdOutlineMailOutline } from "react-icons/md";
import {GuestDetailsContainer,GuestInfoCard,GuestImage,GuestHeader,GuestNameDetails,GuestActions,GuestInfoSection,RoomDetailsCard,StatusBadge,FacilitiesContainer,FacilityItem,CarouselWrapper,CarouselItem, CarouselImage,CarouselCaption,CarouselButtonLeft,CarouselButtonRight,Divider} from "../../styles/GuestDetailsStyles";

const GuestDetails = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentBooking, loading, error } = useSelector((state) => state.bookings);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchBookingById(reservationId));
  }, [dispatch, reservationId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentBooking) return <p>Guest details not found.</p>;

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
  } = currentBooking;

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
  );
};

export { GuestDetails };