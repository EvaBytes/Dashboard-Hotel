import React from "react";
import { FaRegCalendarAlt, FaBookOpen, FaSignOutAlt } from "react-icons/fa"; 
import {
  DashboardContainer,
  StyledCard,
  StyledTypographyTitle,
  StyledTypographyValue,
} from "../assets/dashboardStyles"; 

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      <DashboardContainer>
        <StyledCard>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <FaRegCalendarAlt style={{ marginRight: "10px" }} />
            <StyledTypographyTitle>Bookings</StyledTypographyTitle>
          </div>
          <StyledTypographyValue>8,461</StyledTypographyValue>
        </StyledCard>

        <StyledCard>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <FaBookOpen style={{ marginRight: "10px" }} />
            <StyledTypographyTitle>Scheduled Room</StyledTypographyTitle>
          </div>
          <StyledTypographyValue>963</StyledTypographyValue>
        </StyledCard>

        <StyledCard>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <FaSignOutAlt style={{ marginRight: "10px" }} />
            <StyledTypographyTitle>Check In</StyledTypographyTitle>
          </div>
          <StyledTypographyValue>753</StyledTypographyValue>
        </StyledCard>

        <StyledCard>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <FaSignOutAlt style={{ marginRight: "10px" }} />
            <StyledTypographyTitle>Check Out</StyledTypographyTitle>
          </div>
          <StyledTypographyValue>516</StyledTypographyValue>
        </StyledCard>
      </DashboardContainer>
    </div>
  );
};
