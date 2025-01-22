import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.4rem;
  padding: 2rem 1rem;
  margin-top: 1rem;
`;

export const StyledCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 250px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 1.5rem 0.8rem .5rem 0.8rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  gap: 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #ffedec;
  border-radius: 8px;
  padding: 10px;
  margin-right: 10px;
  color: #d32f2f;
  font-size: 24px;
  transition: all 0.3s ease-in-out;

  ${StyledCard}:hover & {
    background-color: #e23428;
    color: #ffffff;
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
  font-weight: 200;
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
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const StyledBookingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }

    .large-photo {
      margin: 0 1.5rem;
      width: 8rem;
      height: 5rem;
      border-radius: 10px;
      object-fit: cover;
    }


  }
`;

export const StyledBookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 1rem;
  margin-right: 1rem;

  .room-info h4 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    color: #333;
  }

  .room-info p {
    margin: 0.2rem 0;
    font-size: 14px;
    color: #555;
  }

  .guest-info p {
    margin: 0.2rem 0;
    font-size: 12px;
    color: #888;
  }
`;

export const StyledBookingButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const StyledBookingButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  color: #135846;
  border: none;
  cursor: pointer;
  font-size: 14px;

`;
