import React from "react";
import {SidebarContainer,SidebarTitle,SidebarTitleIcon,StarsIcon,HotelIcon,SidebarList,SidebarListItem,SidebarLink,SidebarFooter,SidebarIcon} from "./SidebarStyles";
import { UserContainer } from "./UserContainer.jsx";
import { LuLayoutDashboard, LuBedSingle } from "react-icons/lu";
import { AiOutlineUser, AiOutlineCalendar, AiOutlineContacts } from "react-icons/ai";
import { GiStarsStack } from "react-icons/gi";
import { FaHotel } from "react-icons/fa";

const Sidebar = () => {
  const user = {
    name: "Eva Sevillano",
    email: "user@testing.com",
    image: "src/assets/img/profile.jpeg",
  };

  const links = [
    { label: "Dashboard", path: "/", icon: <LuLayoutDashboard /> },
    { label: "Bookings", path: "/bookings", icon: <AiOutlineCalendar /> },
    { label: "Rooms", path: "/rooms", icon: <LuBedSingle /> },
    { label: "Contact", path: "/contact", icon: <AiOutlineContacts /> },
    { label: "Users", path: "/users", icon: <AiOutlineUser /> },
  ];

  return (
    <SidebarContainer>
      <SidebarTitle>
        <SidebarTitleIcon>
          <StarsIcon>
            <GiStarsStack />
          </StarsIcon>
          <HotelIcon>
            <FaHotel />
          </HotelIcon>
        </SidebarTitleIcon>
        HOTEL <br/>MIRANDA
      </SidebarTitle>

      <SidebarList>
        {links.map((link) => (
          <SidebarListItem key={link.path}>
            <SidebarLink to={link.path}>
              <SidebarIcon>{link.icon}</SidebarIcon>
              {link.label}
            </SidebarLink>
          </SidebarListItem>
        ))}
      </SidebarList>

      <UserContainer user={user} />

      <SidebarFooter>
        <h3>Hotel Miranda Dashboard</h3>
        <p>© 2025 All Rights Reserved</p>
        <p>Made with ♥ by Eva</p>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export { Sidebar };
