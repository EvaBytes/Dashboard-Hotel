import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.4rem;
  padding: 1rem;
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
  max-width: 50%; 
  padding: 2rem; 
  height: auto; 
  display: flex-end;
  flex-direction: column;
  justify-content: center;
`;

