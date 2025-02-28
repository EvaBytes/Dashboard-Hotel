import React, { useState, useEffect } from "react";
import { AiOutlineMail, AiOutlineBell } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { LuCircleArrowLeft, LuCircleArrowRight } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";
import { NavbarContainer, NavbarLeft, NavbarRight, IconButton, TitleContainer, TitleSection, NotificationBadge } from "./NavbarStyles";
import { NavbarProps, Message } from "../../interfaces/dashboard/DashboardState";
import { Booking } from "../../interfaces/bookings/BookingState";

const Navbar = ({ toggleSidebar, sidebarOpen }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [currentMonthBookingsCount, setCurrentMonthBookingsCount] = useState<number>(0);

  const fetchBookingsData = async () => {
    try {
      const response = await fetch("/api/v1/bookings"); 
      const bookings: Booking[] = await response.json(); 

      const currentMonth = new Date().getMonth() + 1;
      const bookingsInProgress = bookings.filter(
        (booking) => new Date(booking.checkIn).getMonth() + 1 === currentMonth && booking.status === "In Progress"
      );
      setCurrentMonthBookingsCount(bookingsInProgress.length);
    } catch (error) {
      console.error("Error fetching bookings data:", error);
    }
  };

  const fetchMessagesData = async () => {
    try {
      const response = await fetch("/api/v1/messages"); 
      const messages: Message[] = await response.json(); 

      const savedReadMessages = JSON.parse(localStorage.getItem("readMessages") || "[]");
      const unreadCount = messages.filter((msg) => !savedReadMessages.includes(msg.messageId)).length;
      setUnreadMessages(unreadCount);
    } catch (error) {
      console.error("Error fetching messages data:", error);
    }
  };

  useEffect(() => {
    fetchBookingsData();
    fetchMessagesData();
  }, []);

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
