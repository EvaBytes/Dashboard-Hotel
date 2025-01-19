import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.4rem;
  padding: 2rem 1rem;
  margin-top:1rem;
`;

export const StyledCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  width: 100%;
  max-width: 250px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 1rem 0.8rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  gap: 1rem;
  transition: all 0.3s ease-in-out; 

    &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

export const StyledIcon = styled.div`
  font-size: 32px; 
  color: #757575; 
  margin-bottom: 0.5rem; 
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #262626; 
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px; 
  height: 50px;
  background-color: #FFEDEC; 
  border-radius: 8px; 
  padding: 10px;
  margin-right: 10px; 
  color: #D32F2F; 
  font-size: 24px;
  transition: all 0.3s ease-in-out;  

   ${StyledCard}:hover & {
    background-color: #E23428;
    color: #FFFFFF;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: flex-start; 
`;

export const StyledTypographyTitle = styled.h6`
  font-size: 14px;
  font-weight:200;
  color: #787878;
  margin: 0;
`;

export const StyledTypographyValue = styled.h4`
  font-size: 24px;
  font-weight: bold;
  color: #262626;
  margin: 0;
`;

export const StyledLargeCard = styled(StyledCard)`
  max-width: 60%; 
  padding: 2rem;
  height: auto;
  justify-content: center;
`;

export const StyledEmptyContainer = styled(StyledCard)`
  max-width: 39%; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export const StyledBookingList = styled.div`
  margin-top: 2rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const StyledBookingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  gap: 1 rem;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    object-fit: cover;
  }
`;

export const StyledBookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem; 

  h4 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #888;
  }
`;

export const StyledBookingButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const StyledBookingButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #fff; 
  color: #135846; 
  border: none;
  border-radius: 5px;
  cursor: pointer;

`;
