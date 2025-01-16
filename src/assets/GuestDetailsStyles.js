import styled from "styled-components";

export const GuestDetailsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

export const GuestInfoCard = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const GuestImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const GuestName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333333;
`;

export const GuestInfo = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #666666;
`;

export const StatusBadge = styled.div`
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  background-color: ${({ status }) =>
    status === "Check-In" ? "#E8FFEE" : status === "Check-Out" ? "#FFEDEC" : "#ffea99"};
  color: ${({ status }) =>
    status === "Check-In" ? "#135846" : status === "Check-Out" ? "#E23428" : "#e0bc00"};
  font-weight: bold;
  border-radius: 5px;
  display: inline-block;
`;

export const RoomInfo = styled.div`
  margin-top: 1rem;

  p {
    margin: 0.5rem 0;
    font-size: 0.9rem;
    color: #444444;
  }
`;

export const PriceTag = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #135846;
  margin: 1rem 0;
`;

export const RoomDetailsCard = styled.div`
  flex: 1;
  background-color: #ffffff;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const BookedBanner = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #4caf50;
  color: #ffffff;
  font-weight: bold;
  padding: 0.3rem 1rem;
  border-radius: 5px;
`;

export const FacilitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const FacilityItem = styled.div`
  padding: 0.5rem 1rem;
  background-color: #eef9f2;
  color: #135846;
  border-radius: 5px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
