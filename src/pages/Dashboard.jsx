import React from "react";
import { IoBedOutline, IoCalendarOutline} from "react-icons/io5";
import { IoIosLogIn,IoIosLogOut} from "react-icons/io";
import {DashboardContainer,IconContainer,TextContainer,StyledCard,StyledTypographyTitle,StyledTypographyValue,StyledLargeCard} from "../assets/dashboardStyles";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import reservationStatsRaw from "../data/ReservationStats.json";

const processData = (data) => {
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const groupedData = data.reduce((acc, curr) => {
    const day = curr.day;
    if (!acc[day]) {
      acc[day] = { day, checkIn: 0, checkOut: 0 };
    }
    acc[day].checkIn += curr.checkIn;
    acc[day].checkOut += curr.checkOut;
    return acc;
  }, {});

  return dayOrder.map((day) => groupedData[day] || { day, checkIn: 0, checkOut: 0 });
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

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardContainer>
        <DashboardCard icon={IoBedOutline} title="Bookings" value="8,461"/>
        <DashboardCard icon={IoCalendarOutline} title="Scheduled Room" value="963" />
        <DashboardCard icon={IoIosLogIn} title="Check In" value="753"/>
        <DashboardCard icon={IoIosLogOut} title="Check Out"value="516"/>
      </DashboardContainer>

      <StyledLargeCard>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processedData} barSize={15}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fontWeight: '100', fill: '#000' }} 
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="checkIn" fill="#135846" name="Check In" />
            <Bar dataKey="checkOut" fill="#E23428" name="Check Out" />
          </BarChart>
        </ResponsiveContainer>
      </StyledLargeCard>
    </div>
  );
};
