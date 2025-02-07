import React from "react";
import { AiOutlineMail, AiOutlineBell } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { LuCircleArrowLeft, LuCircleArrowRight } from "react-icons/lu";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext.jsx";
import {NavbarContainer,NavbarLeft,NavbarRight,IconButton,TitleContainer,TitleSection,BreadcrumbSection,Breadcrumb} from "./NavbarStyles.js";
import { NavbarProps} from "../../interfaces/SidebarState.ts"

const Navbar = ({ toggleSidebar, sidebarOpen }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const pageTitleMap = {
    "/": "Dashboard",
    "/bookings": "Bookings",
    "/rooms": "Rooms",
    "/contact": "Contact",
    "/users": "Users",
    "/user-details" : "User Details",
    "/new-booking": "New Booking",
    "/new-room": "New Room",
    "/new-user": "New User",
    "/guest": "Guest Details",
    "/room-details": "Room Details", 
  };

  const getPageTitle = () => {
    const pathSegments = location.pathname.split("/");
    const basePath = `/${pathSegments[1]}`;

    if (basePath === "/room-details") {
      return "Room Details";
    }
    if (basePath === "/user-details") {
      return "User Details"; 
    }

    return basePath === "/guest" ? "Bookings" : pageTitleMap[basePath] || "Unknown Page";
  };

  const pageTitle = getPageTitle();

  const getBreadcrumbs = () => {
    if (location.pathname.startsWith("/guest")) {
      return (
        <Breadcrumb>
          <Link to="/bookings">Bookings</Link> /{" "}
          <span>{location.state?.guestName || "Guest Details"}</span>
        </Breadcrumb>
      );
    } else if (location.pathname.startsWith("/room-details")) {
      return (
        <Breadcrumb>
          <Link to="/rooms">Rooms</Link> /{" "}
          <span>{location.state?.roomNumber || "Room Details"}</span>
        </Breadcrumb>
      );
    } else if (location.pathname.startsWith("/user-details")) {
      return (
        <Breadcrumb>
          <Link to="/users">Users</Link> /{" "}
          <span>{location.state?.userName || "User Details"}</span>
        </Breadcrumb>
      );
    }
    return null;
  };

  const breadcrumbs = getBreadcrumbs();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <NavbarContainer $sidebarOpen={sidebarOpen}>
      <NavbarLeft>
        <TitleContainer>
          <IconButton onClick={toggleSidebar}>
            {sidebarOpen ? (
              <LuCircleArrowLeft size={24} color="black" />
            ) : (
              <LuCircleArrowRight size={24} color="black" />
            )}
          </IconButton>
          <TitleSection>{pageTitle}</TitleSection>
        </TitleContainer>
        {breadcrumbs ? <BreadcrumbSection>{breadcrumbs}</BreadcrumbSection> : null}
      </NavbarLeft>
      <NavbarRight>
        <IconButton>
          <AiOutlineMail size={24} />
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