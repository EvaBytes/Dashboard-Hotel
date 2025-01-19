import React from "react";
import { useNavigate } from "react-router-dom";
import { IoBedOutline, IoCalendarOutline } from "react-icons/io5";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import {DashboardContainer,IconContainer,TextContainer,StyledCard,StyledTypographyTitle,StyledTypographyValue,StyledLargeCard,StyledEmptyContainer,StyledBookingButtonContainer,StyledBookingList,StyledBookingItem,StyledBookingInfo,StyledBookingButton} from "../styles/DashboardStyles.js";
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from "recharts";
import { LatestMessages } from "../components/common/LatestMessages.jsx";
import { StyledMessagesCard } from "../styles/LatestMessagesStyles.js";
import reservationStatsRaw from "../data/ReservationStats.json";
import bookingData from "../data/Bookings.json";
import messagesData from "../data/Messages.json";

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const initializeDayData = (day) => ({ day, checkIn: 0, checkOut: 0 });

const groupDataByDay = (data) => {
  return data.reduce((acc, { day, checkIn, checkOut }) => {
    if (!acc[day]) {
      acc[day] = initializeDayData(day);
    }
    acc[day].checkIn += checkIn;
    acc[day].checkOut += checkOut;
    return acc;
  }, {});
};

const mapDataToOrder = (groupedData, order) => {
  return order.map((day) => groupedData[day] || initializeDayData(day));
};

const processData = (data) => {
  const groupedData = groupDataByDay(data);
  return mapDataToOrder(groupedData, dayOrder);
};

const processedData = processData(reservationStatsRaw);

const DashboardCard = ({ icon: Icon, title, value }) => {
  return (
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
};

const BookingList = () => {
  const navigate = useNavigate();

  return (
    <StyledBookingList>
      {bookingData.slice(0, 3).map((booking, index) => (
        <StyledBookingItem key={index}>
          <div className="room-photo">
            <img
              src={booking.roomPhoto || "src/assets/img/LUXURYcutre.jpg"} 
              alt={booking.roomType}
              className="large-photo"
            />
          </div>
          <StyledBookingInfo>
            <div className="room-info">
              <h4>{booking.roomType}</h4>
              <p>Room No: {booking.guest.reservationNumber}</p>
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
  return (
    <div>
      <DashboardContainer>
        <DashboardCard icon={IoBedOutline} title="Bookings" value="8,461" />
        <DashboardCard icon={IoCalendarOutline} title="Scheduled Room" value="963" />
        <DashboardCard icon={IoIosLogIn} title="Check In" value="753" />
        <DashboardCard icon={IoIosLogOut} title="Check Out" value="516" />
      </DashboardContainer>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", width: "100%" }}>
        <StyledEmptyContainer>
          <div style={{ textAlign: "center", color: "#888" }}>Calendar</div>
        </StyledEmptyContainer>

        <StyledLargeCard>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedData} barSize={15}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fontWeight: "100", fill: "#000" }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="checkIn" fill="#135846" name="Check In" />
              <Bar dataKey="checkOut" fill="#E23428" name="Check Out" />
            </BarChart>
          </ResponsiveContainer>
        </StyledLargeCard>
      </div>

      <BookingList />

      <StyledMessagesCard>
        <h4>Latest Messages</h4>
        <LatestMessages messages={messagesData} />
      </StyledMessagesCard>
    </div>
  );
};
