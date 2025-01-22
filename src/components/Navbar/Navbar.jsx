import React from "react";
import { AiOutlineMail, AiOutlineBell } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { LuCircleArrowLeft, LuCircleArrowRight } from "react-icons/lu";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import {NavbarContainer, NavbarLeft,NavbarRight,IconButton,TitleContainer,TitleSection, BreadcrumbSection, Breadcrumb} from "./navbarStyles";

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitleMap = {
    "/": "Dashboard",
    "/bookings": "Bookings",
    "/rooms": "Rooms",
    "/contact": "Contact",
    "/users": "Users",
  };

  const pageTitle =
    pageTitleMap[location.pathname.split("/")[1] ? `/${location.pathname.split("/")[1]}` : "/"] ||
    (location.pathname.startsWith("/guest-details") && "Bookings") ||
    "Unknown Page";

  const breadcrumbs =
    location.pathname.startsWith("/guest-details") ? (
      <Breadcrumb>
        <Link to="/bookings">Guest</Link> /{" "}
        <span>{location.state?.guestName || "Guest Details"}</span>
      </Breadcrumb>
    ) : null;

  const handleLogout = () => {
    dispatch(logout());
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
        {breadcrumbs && <BreadcrumbSection>{breadcrumbs}</BreadcrumbSection>}
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
