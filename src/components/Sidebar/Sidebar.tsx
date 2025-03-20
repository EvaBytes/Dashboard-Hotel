import React from "react";
import {SidebarContainer,SidebarTitle,SidebarTitleIcon,HotelIcon,SidebarList,SidebarListItem,SidebarLink,SidebarFooter,SidebarIcon} from "./SidebarStyles";
import { UserContainer } from "./UserContainer.jsx";
import { LuLayoutDashboard, LuBedSingle } from "react-icons/lu";
import { AiOutlineUser, AiOutlineCalendar, AiOutlineContacts } from "react-icons/ai";
import { User } from "../../interfaces/SidebarState";

const Sidebar = () => {
  const user: User = {
    name: "Eva Sevillano",
    email: "user3@example.com",
    image: "/profile.jpeg",
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
          <HotelIcon>
            <img src="/Hotel.png" alt="Hotel Logo" style={{width: "5.5rem", height: "5rem"}}/>
            <img src="/Logo.png" alt="Hotel Miranda Text" style={{width: "6rem", height: "5rem"}}/>
          </HotelIcon>
        </SidebarTitleIcon>
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
