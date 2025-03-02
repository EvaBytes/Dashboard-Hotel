import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingById } from "../../redux/thunks/bookingsThunks"; 
import { parseISO, format, isValid } from "date-fns";
import { MdOutlinePhone, MdOutlineMailOutline} from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import {GuestDetailsContainer,GuestInfoCard,GuestImage,GuestHeader,GuestNameDetails,GuestActions,GuestInfoSection,RoomDetailsCard,StatusBadge,FacilitiesContainer,FacilityItem,CarouselWrapper, CarouselItem, CarouselImage,CarouselCaption,CarouselButtonLeft,CarouselButtonRight,Divider,ActionButton,ModifyButton} from "../../styles/GuestDetailsStyles";
import { RootState, AppDispatch } from "../../redux/store";

const GuestDetails = () => {
  const { reservationNumber } = useParams<{ reservationNumber: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentBooking, loading, error } = useSelector((state: RootState) => state.bookings);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (reservationNumber) {
      dispatch(fetchBookingById(reservationNumber));
    } else {
      console.error("reservationNumber is undefined");
    }
  }, [dispatch, reservationNumber]);

  if (loading === "pending") return <p>Loading...</p>;
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
          <GuestImage src={guest?.image || "default-image.png"} alt={guest?.fullName || "Guest"} />
          <GuestNameDetails>
            <h2>{guest?.fullName || "Guest Name Not Available"}</h2>
            <p>ID: {guest?.reservationNumber || "No ID Available"}</p>
          </GuestNameDetails>
        </GuestHeader>
        <GuestActions>
          <ActionButton onClick={() => alert("Calling...")}>
            <MdOutlinePhone /> Call
          </ActionButton>
          <ActionButton onClick={() => alert("Sending message...")}>
            <MdOutlineMailOutline /> Send Message
          </ActionButton>
          <ModifyButton onClick={() => navigate(`/edit/${reservationNumber}`)}>
            <FaPencilAlt /> Edit
          </ModifyButton>
        </GuestActions>
        <Divider />
        <GuestInfoSection>
          <p>
            <strong>Check-In:</strong>{" "}
            {checkIn && isValid(parseISO(checkIn))
              ? format(parseISO(checkIn), "MMM dd, yyyy")
              : "N/A"}
          </p>
          <p>
            <strong>Check-Out:</strong>{" "}
            {checkOut && isValid(parseISO(checkOut))
              ? format(parseISO(checkOut), "MMM dd, yyyy")
              : "N/A"}
          </p>
        </GuestInfoSection>
        <Divider />
        <GuestInfoSection>
          <p>
            <strong>Room Type:</strong> {roomType || "N/A"}
          </p>
          <p>
            <strong>Room Price:</strong> {offerPrice || "N/A"}
          </p>
          <p>
            <strong>Special Request:</strong> {specialRequest || "None"}
          </p>
        </GuestInfoSection>
        <Divider />
        <FacilitiesContainer>
          {Array.isArray(facilities) && facilities.length > 0 ? (
            facilities.map((facility) => (
              <FacilityItem key={facility}>{facility}</FacilityItem>
            ))
          ) : (
            <p>No facilities available</p>
          )}
        </FacilitiesContainer>
      </GuestInfoCard>

      <RoomDetailsCard>
        <StatusBadge $status={status}>{status}</StatusBadge>
        <CarouselWrapper>
          <CarouselButtonLeft onClick={handlePrevImage}>&#8592;</CarouselButtonLeft>
          <CarouselItem>
            <CarouselImage
              src={roomPhoto && roomPhoto.length > 0 ? roomPhoto[currentImageIndex] : "/kate-branch-G18uHzrihOE-unsplash.jpg"}
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