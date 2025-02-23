import React, { useState, useEffect } from "react";
import { AiOutlineMail, AiOutlineBell } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { LuCircleArrowLeft, LuCircleArrowRight } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext.tsx";
import {NavbarContainer,NavbarLeft,NavbarRight,IconButton,TitleContainer,TitleSection,NotificationBadge} from "./NavbarStyles.ts";
import { NavbarProps, Message } from "../../interfaces/dashboard/DashboardState.ts";
import { Booking } from "../../interfaces/bookings/BookingState.ts";
import bookingData from "../../../public/data/Bookings.json";
import messagesData from "../../../public/data/Messages.json";

const Navbar = ({ toggleSidebar, sidebarOpen }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [unreadMessages, setUnreadMessages] = useState<number>(0);

  useEffect(() => {
    const savedReadMessages = JSON.parse(localStorage.getItem("readMessages") || "[]");
    const unreadCount = (messagesData as Message[]).filter(
      (msg) => !savedReadMessages.includes(msg.messageId)
    ).length;
    setUnreadMessages(unreadCount);
  }, []);

  const updateUnreadMessages = () => {
    const savedReadMessages = JSON.parse(localStorage.getItem("readMessages") || "[]");
    const unreadCount = (messagesData as Message[]).filter(
      (msg) => !savedReadMessages.includes(msg.messageId)
    ).length;
    setUnreadMessages(unreadCount);
  };

  const getCurrentMonthBookings = (bookings: Booking[]) => {
    const currentMonth = new Date().getMonth() + 1;
    return bookings.filter(
      (booking) => new Date(booking.checkIn).getMonth() + 1 === currentMonth
    ).length;
  };

  const currentMonthBookingsCount = getCurrentMonthBookings(bookingData as Booking[]);

  const pageTitleMap: Record<string, string> = {
    "/": "Dashboard",
    "/bookings": "Bookings",
    "/rooms": "Rooms",
    "/contact": "Contact",
    "/users": "Users",
    "/user-details": "User Details",
    "/new-booking": "New Booking",
    "/new-room": "New Room",
    "/new-user": "New User",
    "/guest": "Guest Details",
    "/room-details": "Room Details",
  };

  const getPageTitle = (): string => {
    const pathSegments = location.pathname.split("/");
    const basePath = `/${pathSegments[1]}`;

    if (basePath === "/room-details") return "Room Details";
    if (basePath === "/user-details") return "User Details";
    return basePath === "/guest" ? "Bookings" : pageTitleMap[basePath] || "Unknown Page";
  };

  const pageTitle = getPageTitle();

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
      </NavbarLeft>
      <NavbarRight>
        <IconButton onClick={() => navigate("/contact")}>
          <AiOutlineMail size={24} />
          {unreadMessages > 0 && (
            <NotificationBadge>{unreadMessages}</NotificationBadge>
          )}
        </IconButton>
        <IconButton onClick={() => navigate("/bookings")}>
          <AiOutlineBell size={24} />
          {currentMonthBookingsCount > 0 && (
            <NotificationBadge>{currentMonthBookingsCount}</NotificationBadge>
          )}
        </IconButton>
        <IconButton onClick={handleLogout}>
          <FiLogOut size={24} />
        </IconButton>
      </NavbarRight>
    </NavbarContainer>
  );
};

export { Navbar };
