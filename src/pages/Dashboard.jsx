import React from "react";
import { CardContent} from "@mui/material";
import { FaRegCalendarAlt, FaBookOpen, FaSignOutAlt } from "react-icons/fa"; 
import { DashboardContainer, StyledCard, StyledTypographyTitle, StyledTypographyValue } from "../assets/DashboardStyles"; 

export const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      <DashboardContainer>
        <StyledCard>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <FaRegCalendarAlt style={{ marginRight: "10px" }} />
              <StyledTypographyTitle variant="h6" color="textSecondary">
                Bookings
              </StyledTypographyTitle>
            </div>
            <StyledTypographyValue variant="h4" color="primary">
              8,461
            </StyledTypographyValue>
          </CardContent>
        </StyledCard>

        <StyledCard>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <FaBookOpen style={{ marginRight: "10px" }} />
              <StyledTypographyTitle variant="h6" color="textSecondary">
                Scheduled Room
              </StyledTypographyTitle>
            </div>
            <StyledTypographyValue variant="h4" color="primary">
              963
            </StyledTypographyValue>
          </CardContent>
        </StyledCard>

        <StyledCard>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <FaSignOutAlt style={{ marginRight: "10px" }} />
              <StyledTypographyTitle variant="h6" color="textSecondary">
                Check In
              </StyledTypographyTitle>
            </div>
            <StyledTypographyValue variant="h4" color="primary">
              753
            </StyledTypographyValue>
          </CardContent>
        </StyledCard>

        <StyledCard>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <FaSignOutAlt style={{ marginRight: "10px" }} />
              <StyledTypographyTitle variant="h6" color="textSecondary">
                Check Out
              </StyledTypographyTitle>
            </div>
            <StyledTypographyValue variant="h4" color="primary">
              516
            </StyledTypographyValue>
          </CardContent>
        </StyledCard>
      </DashboardContainer>
    </div>
  );
};
