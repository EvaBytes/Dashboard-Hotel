import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.text.primary};
  border-radius: 3px;
  height: 100vh;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SidebarTitleIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 .5rem .5rem 2rem;
`;

export const StarsIcon = styled.span`
  font-size: 1.5rem; 
  color: gold; 
  margin-bottom: -5px; 
`;

export const HotelIcon = styled.span`
  font-size: 2.6rem; 
  color: darkgreen; 
`;

export const SidebarTitle = styled.h4`
  color: #212121;
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SidebarListItem = styled.li`
  margin-bottom: 1rem;
`;

export const SidebarLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: #135846; 
  font-weight: normal;
  border-radius: 3px;
  border-left: 4px solid transparent; 
  transition: all 0.3s ease;

  &.active {
    color: #e23428; 
    font-weight: bold;
    border-left: 4px solid #e23428; 
  }

  &:hover {
    color: #e23428;
    text-decoration: none;
  }
`;


export const SidebarIcon = styled.span`
  font-size: 20px;
  margin-right: 0.5rem;
  display: inline-block;
`;

export const SidebarFooter = styled.footer`
  text-align: center;
  margin-top: 1.2rem;
  font-size: 12px;
`;