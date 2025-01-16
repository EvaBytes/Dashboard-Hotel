import React from "react";
import { AiOutlineMessage, AiOutlineBell } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { BiSolidLeftArrowSquare, BiSolidRightArrowSquare } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { NavbarContainer, NavbarLeft, NavbarRight, IconButton } from "./navbarStyles";

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const pageTitles = {
    "/": "Dashboard",
    "/bookings": "Bookings",
    "/rooms": "Rooms",
    "/contacts": "Contacts",
    "/users": "Users",
  };

  let currentPageTitle = pageTitles[location.pathname] || "Dashboard";
  if (location.pathname.includes("/guest-details")) {
    currentPageTitle = "Guest Details";
  }

  return (
    <NavbarContainer sidebarOpen={sidebarOpen}>
      <NavbarLeft>
        <IconButton onClick={toggleSidebar}>
          {sidebarOpen ? (
            <BiSolidLeftArrowSquare size={24} />
          ) : (
            <BiSolidRightArrowSquare size={24} />
          )}
        </IconButton>
        <h1>{currentPageTitle}</h1> 
      </NavbarLeft>
      <NavbarRight>
        <IconButton>
          <AiOutlineMessage size={24} />
        </IconButton>
        <IconButton>
          <AiOutlineBell size={24} />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <FiLogOut size={24} />
        </IconButton>
      </NavbarRight>
    </NavbarContainer>
  );
};

export { Navbar };
