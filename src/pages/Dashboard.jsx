import React from "react";
import { IoBedOutline, IoCalendarOutline } from "react-icons/io5";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import {DashboardContainer,IconContainer,TextContainer,StyledCard,StyledTypographyTitle,StyledTypographyValue,StyledLargeCard,StyledEmptyContainer,StyledBookingList,StyledBookingItem,StyledBookingInfo,StyledBookingButton,} from "../assets/DashboardStyles";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import reservationStatsRaw from "../data/ReservationStats.json";
import bookingData from "../data/Bookings.json";
import { useNavigate } from "react-router-dom";


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
          <img src={booking.guest.image} alt={booking.guest.fullName} />
          <StyledBookingInfo>
            <h4>
              {booking.roomType} - {booking.guest.reservationNumber}
            </h4>
            <p>{booking.guest.fullName}</p>
            <p>
              Check-in: {booking.checkIn} · Check-out: {booking.checkOut}
            </p>
          </StyledBookingInfo>
        </StyledBookingItem>
      ))}
      <StyledBookingButton onClick={() => navigate("/bookings")}>View More</StyledBookingButton>
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
    </div>
  );
};
