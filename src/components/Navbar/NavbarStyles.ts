import styled from "styled-components";
import {SidebarProps} from "../../interfaces/styles/sidebarOpenProps"

export const NavbarContainer = styled.nav<SidebarProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  top: 0;
  position: fixed;
  width: ${(props) => (props.$sidebarOpen ? "calc(100% - 240px)" : "100%")};
  margin-left: ${(props) => (props.$sidebarOpen ? "250px" : "0")};
  transition: width 0.4s ease-in-out, margin-left 0.4s ease-in-out;
`;

export const NavbarLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;

export const IconButton = styled.button`
  position: relative; 
  background: none;
  border: none;
  color: #135846;
  margin: 0 0.8rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.5;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  bottom: .8rem;
  left: .9rem;
  background-color: #E23428;
  border: 1px solid white;
  color: white;
  font-size: 10px;
  font-weight: 400;
  border-radius: 6px;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const TitleContainer = styled.div`
  display: flex;
  align-items: center; 
  gap: 0.5rem; 
`;

export const TitleSection = styled.h1`
  font-size: 1.5rem; 
  font-weight: bold;
  color: black;
  margin: 0;
`;

export const BreadcrumbSection = styled.div`
  margin: .5rem 0 0 3.5rem;
`;

export const Breadcrumb = styled.div`
  font-size: .9rem;
  font-weight: normal;
  color: #6c757d; 
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: #135846; 
    font-weight: bold;

    &:hover {
      opacity: 0.7; 
    }
  }

  span {
    margin-left: 0.5rem;
    color: #6c757d; 
  }
`;

