import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingById } from "../../redux/thunks/bookingsThunks.js"; 
import { format } from "date-fns";
import { MdOutlinePhone, MdOutlineMailOutline} from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import {GuestDetailsContainer,GuestInfoCard,GuestImage,GuestHeader,GuestNameDetails,GuestActions,GuestInfoSection,RoomDetailsCard,StatusBadge,FacilitiesContainer,FacilityItem,CarouselWrapper, CarouselItem, CarouselImage,CarouselCaption,CarouselButtonLeft,CarouselButtonRight,Divider,ActionButton,ModifyButton} from "../../styles/GuestDetailsStyles.js";
import { RootState, AppDispatch } from "../../redux/store.ts";
import { Booking } from "../../interfaces/bookings/BookingState.ts";

const GuestDetails = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentBooking, loading, error } = useSelector((state: RootState) => state.bookings);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const booking: Booking = currentBooking;

  useEffect(() => {
    if (reservationId) {
      dispatch(fetchBookingById(reservationId));
    } else {
      console.error("reservationId is undefined");
    }
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
          <ActionButton onClick={() => alert("Calling...")}>
            <MdOutlinePhone /> Call
          </ActionButton>
          <ActionButton onClick={() => alert("Sending message...")}>
            <MdOutlineMailOutline /> Send Message
          </ActionButton>
          <ModifyButton onClick={() => navigate(`/edit/${reservationId}`)}>
            <FaPencilAlt />
            Edit
          </ModifyButton>
        </GuestActions>
        <Divider />
        <GuestInfoSection>
          <p>
            <strong>Check-In:</strong>{" "}
            {format(new Date(checkIn), "MMM dd, yyyy")}
          </p>
          <p>
            <strong>Check-Out:</strong>{" "}
            {format(new Date(checkOut), "MMM dd, yyyy")}
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