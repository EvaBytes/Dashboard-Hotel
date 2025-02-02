import styled from "styled-components";
import { Link } from "react-router-dom";

export const GuestDetailsContainer = styled.div`
  display: flex;
  margin-top: 4rem;
  padding: 2rem 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

export const GuestInfoCard = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const GuestImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const GuestHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const GuestNameDetails = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #799283;
  }
`;

export const GuestActions = styled.div`
  display: flex;
  gap: 0.5rem; 
  margin: 1rem 0;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem; 
  background: #135846;
  color: #fff;
  border: none;
  padding: 0.3rem 0.7rem; 
  border-radius: 5px;
  font-size: 0.8rem; 
  cursor: pointer;

  svg {
    font-size: 1rem; 
  }

  &:hover {
    background: #0f4a3c;
  }
`;

export const ModifyButton = styled.button`
  padding: .4rem 1rem;
  background-color: white;
  border: 1px solid #799283;
  color: #799283;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 100;
  display: flex;
  align-items: center;
  gap: .4rem;

  svg {
    font-size: .7rem;
  }

  &:hover {
    background-color: #00000014;
  }
`;

export const GuestInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    margin: 0;
    font-size: 0.9rem;

    strong {
      color: #000;
    }
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1rem 0;
`;

export const StatusBadge = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${({ $status }) =>
    $status === "Check-In"
      ? "#E8FFEE"
      : $status === "Check-Out"
      ? "#FFEDEC"
      : "#FFFAE6"};
  color: ${({ $status }) =>
    $status === "Check-In"
      ? "#135846"
      : $status === "Check-Out"
      ? "#E23428"
      : "#E0BC00"};
  font-weight: bold;
  border-radius: 5px;
  display: inline-block;
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

export const RoomDetailsCard = styled.div`
  flex: 1;
  background-color: #ffffff;
  border-radius: 0 10px 10px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0 6px rgba(0, 0, 0, 0.1);
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
  font-size: 0.9rem;
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  padding: 0 0 1rem 0;
`;

export const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const CarouselImage = styled.img`
  width: 100%;
  aspect-ratio: 7 / 7; 
  overflow: hidden;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CarouselCaption = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;
  font-size: 1rem;
  color: #444444;
  text-align: left; 
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 45%;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 1rem;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

export const CarouselButtonLeft = styled(CarouselButton)`
  left: 10px;
`;

export const CarouselButtonRight = styled(CarouselButton)`
  right: 10px;
`;

export const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.9rem;
  color: #333333;
`;

export const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: #135846;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
