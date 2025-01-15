import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.4rem;
  padding: 1rem;
`;

export const StyledCard = styled.div`
  width: 100%;
  max-width: 250px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 1rem 0.8rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  flex-basis: 22%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledTypographyTitle = styled.h6`
  font-size: 16px;
  text-align: center;
  color: #757575;
  margin: 0;
`;

export const StyledTypographyValue = styled.h4`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #262626;
  margin: 0;
`;
