import React from "react";
import { LuLayoutDashboard, LuBedSingle } from "react-icons/lu";
import { AiOutlineUser, AiOutlineCalendar, AiOutlineContacts } from "react-icons/ai";
import { FaHotel } from "react-icons/fa"; 
import {SidebarContainer,SidebarTitle,SidebarTitleIcon,SidebarList,SidebarListItem,SidebarLink,SidebarFooter,SidebarIcon,} from "./SidebarStyles";
import { UserContainer } from "./UserContainer";

const Sidebar = () => {
  const user = {
    name: "Eva Sevillano Plata",
    email: "evasevillanop@gmail.com",
    image: "src/assets/img/profile.jpeg",
  };

  const links = [
    { label: "Dashboard", path: "/", icon: <LuLayoutDashboard /> },
    { label: "Bookings", path: "/bookings", icon: <AiOutlineCalendar /> },
    { label: "Rooms", path: "/rooms", icon: <LuBedSingle /> },
    { label: "Contacts", path: "/contacts", icon: <AiOutlineContacts /> },
    { label: "Users", path: "/users", icon: <AiOutlineUser /> },
  ];

  return (
    <SidebarContainer>
      <SidebarTitle>
        <SidebarTitleIcon>
          <FaHotel />
        </SidebarTitleIcon>
        travl
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
        <p>Travel Hotel Admin Dashboard</p>
        <p>© 2025 All Rights Reserved</p>
        <p>Made with ♥ by Peterdraw</p>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export { Sidebar };
