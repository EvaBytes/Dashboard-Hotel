import { styled } from "@mui/system";
import { Card, CardContent, Typography } from "@mui/material";

export const DashboardContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.4rem; 
`;

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 250px; 
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 1rem .8rem;
  flex-grow: 1;
  flex-basis: 22%; 
`;

export const StyledTypographyTitle = styled(Typography)`
  font-size: 16px;
  text-align: center;
  color: #757575;
`;

export const StyledTypographyValue = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #262626;
`;
