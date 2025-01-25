import React from "react";
import { useNavigate } from "react-router-dom";
import { IoBedOutline, IoCalendarOutline } from "react-icons/io5";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import {DashboardContainer,IconContainer,TextContainer,StyledCard,StyledTypographyTitle,StyledTypographyValue,StyledBookingButtonContainer,StyledBookingList,StyledBookingItem,StyledBookingInfo,StyledBookingButton} from "../styles/DashboardStyles.js";
import { LatestMessages } from "../components/common/LatestMessages.jsx";
import { StyledMessagesCard } from "../styles/LatestMessagesStyles.js";
import bookingData from "../data/Bookings.json";
import messagesData from "../data/Messages.json";

const calculateMetrics = (data) => {
  const totalBookings = data.length;
  const checkIns = data.filter((booking) => booking.status === "Check-In").length;
  const checkOuts = data.filter((booking) => booking.status === "Check-Out").length;
  const inProgress = data.filter((booking) => booking.status === "In Progress").length;

  return { totalBookings, checkIns, checkOuts, inProgress };
};

const DashboardCard = ({ icon: Icon, title, value }) => (
  <StyledCard>
    <IconContainer>
      <Icon />
    </IconContainer>
    <TextContainer>
      <StyledTypographyValue>{value}</StyledTypographyValue>
      <StyledTypographyTitle>{title}</StyledTypographyTitle>
    </TextContainer>
  </StyledCard>
);

const BookingList = () => {
  const navigate = useNavigate();

  return (
    <StyledBookingList>
      {bookingData.slice(0, 3).map((booking, index) => (
        <StyledBookingItem key={index}>
          <div className="room-photo">
            <img
              src={booking.photo || "src/assets/img/LUXURYcutre.jpg"}
              alt={booking.roomType}
              className="large-photo"
            />
          </div>
          <StyledBookingInfo>
            <div className="room-info">
              <h4>{booking.roomType}</h4>
              <p>Room: {booking.roomNumber}</p>
            </div>
            <div className="guest-info">
              <p>{booking.guest.fullName}</p>
              <p>Check-in: {booking.checkIn}</p>
              <p>Check-out: {booking.checkOut}</p>
            </div>
          </StyledBookingInfo>
        </StyledBookingItem>
      ))}
      <StyledBookingButtonContainer>
        <StyledBookingButton onClick={() => navigate("/bookings")}>
          View More
        </StyledBookingButton>
      </StyledBookingButtonContainer>
    </StyledBookingList>
  );
};

export const Dashboard = () => {
  const { totalBookings, checkIns, checkOuts, inProgress } = calculateMetrics(bookingData);

  return (
    <div>
      <DashboardContainer>
        <DashboardCard icon={IoBedOutline} title="Bookings" value={totalBookings} />
        <DashboardCard icon={IoCalendarOutline} title="In Progress" value={inProgress} />
        <DashboardCard icon={IoIosLogIn} title="Check In" value={checkIns} />
        <DashboardCard icon={IoIosLogOut} title="Check Out" value={checkOuts} />
      </DashboardContainer>

      <BookingList />

      <StyledMessagesCard>
        <h4>Latest Messages</h4>
        <LatestMessages messages={messagesData} showNavigationButtons={true} />
      </StyledMessagesCard>
    </div>
  );
};