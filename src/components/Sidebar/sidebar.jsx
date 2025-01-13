import React from "react";
import { SidebarContainer, SidebarTitle, SidebarList, SidebarListItem, SidebarLink, SidebarFooter } from "./SidebarStyles";
import { UserContainer } from "./UserContainer";

const Sidebar = () => {
  const user = {
    name: "Eva Sevillano Plata",
    email: "evasevillanop@gmail.com",
    image: "https://via.placeholder.com/100",
  };

  const links = [
    { label: "Dashboard", path: "/" },
    { label: "Bookings", path: "/bookings" },
    { label: "Rooms", path: "/rooms" },
    { label: "Contact", path: "/contact" },
    { label: "Users", path: "/users" },
  ];

  return (
    <SidebarContainer>
      <SidebarTitle>Hotel Dashboard</SidebarTitle>

      <SidebarList>
        {links.map((link) => (
          <SidebarListItem key={link.path}>
            <SidebarLink to={link.path}>{link.label}</SidebarLink>
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
