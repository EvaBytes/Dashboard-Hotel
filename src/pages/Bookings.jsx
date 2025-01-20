import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuUserRoundSearch } from "react-icons/lu"; 
import bookingsData from "../data/Bookings.json";
import { GenericTable } from "../components/common/GenericTable.jsx";
import { GenericButton } from "../components/common/GenericButton.jsx";
import { TableData, GuestContainer, GuestImage, GuestInfo, StatusBadge} from "../styles/TableStyles.js";
import { TabsContainer, Tab, SearchContainer, SearchInput, SearchIconWrapper } from "../styles/TabsStyles.js";
import { Overlay, Popup, CloseButton } from "../styles/PopupStyles.js";

export const Bookings = () => {
  const [activeTab, setActiveTab] = useState("allBookings");
  const [searchText, setSearchText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentSpecialRequest, setCurrentSpecialRequest] = useState("");
  const navigate = useNavigate();
  const handleTabChange = (tab) => setActiveTab(tab);
  const handleSearchChange = (event) => setSearchText(event.target.value.toLowerCase());

  const openPopup = (specialRequest) => {
    setCurrentSpecialRequest(specialRequest);
    setIsPopupOpen(true);
  };


  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentSpecialRequest("");
  };


  const cleanedData = bookingsData.map((booking) => ({
    ...booking,
    orderDate: new Date(booking.orderDate.trim()),
    checkIn: new Date(booking.checkIn.trim()),
    checkOut: new Date(booking.checkOut.trim()),
  }));

  
  const filteredData = cleanedData
    .filter((booking) => {
      
      if (activeTab === "checkIn") {
        return true;
      }
      if (activeTab === "checkOut") {
        return true;
      }
      if (activeTab === "inProgress") {
        return true;
      }
      return true; 
    })
    .filter((booking) => {
      return booking.guest.fullName.toLowerCase().includes(searchText);
    })
    .sort((a, b) => {
      if (activeTab === "checkIn") {
        return b.checkIn - a.checkIn;
      }
      if (activeTab === "checkOut") {
        return b.checkOut - a.checkOut;
      }
      if (activeTab === "inProgress") {
        return b.orderDate - a.orderDate;
      }
      return b.orderDate - a.orderDate;
    });

  const headers = [
    "Guest",
    "Order Date",
    "Check In",
    "Check Out",
    "Special Request",
    "Room Type",
    "Status",
    "",
  ];

  const renderRow = (booking) => (
    <>
      <TableData>
        <GuestContainer>
          <GuestImage src={booking.guest.image} alt="Guest" />
          <GuestInfo>
            {booking.guest.fullName}
            <br />
            <small>{booking.guest.reservationNumber}</small>
          </GuestInfo>
        </GuestContainer>
      </TableData>
      <TableData>{format(booking.orderDate, "MMM dd, yyyy hh:mm a")}</TableData>
      <TableData>{format(booking.checkIn, "MMM dd, yyyy")}</TableData>
      <TableData>{format(booking.checkOut, "MMM dd, yyyy")}</TableData>
      <TableData>
        <GenericButton variant="default" onClick={() => openPopup(booking.specialRequest)}>
          View Notes
        </GenericButton>
      </TableData>
      <TableData>{booking.roomType}</TableData>
      <TableData>
        <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
      </TableData>
      <TableData>
        <HiOutlineDotsVertical
          size={16}
          color="#6E6E6E"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/guest-details/${booking.guest.reservationNumber}`)}
        />
      </TableData>
    </>
  );

  return (
    <div>
      <TabsContainer>
        <Tab active={activeTab === "allBookings"} onClick={() => handleTabChange("allBookings")}>
          All Bookings
        </Tab>
        <Tab active={activeTab === "checkIn"} onClick={() => handleTabChange("checkIn")}>
          Check-In
        </Tab>
        <Tab active={activeTab === "checkOut"} onClick={() => handleTabChange("checkOut")}>
          Check-Out
        </Tab>
        <Tab active={activeTab === "inProgress"} onClick={() => handleTabChange("inProgress")}>
          In Progress
        </Tab>
        <SearchContainer>
          <SearchIconWrapper>
            <LuUserRoundSearch size={20} color="#6E6E6E" />
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder="Search by guest name"
            value={searchText}
            onChange={handleSearchChange}
          />
        </SearchContainer>
      </TabsContainer>

      <GenericTable
        headers={headers}
        data={filteredData}
        renderRow={renderRow}
        itemsPerPage={10}
      />

      {isPopupOpen && (
        <Overlay>
          <Popup>
            <h3>Special Request</h3>
            <p>{currentSpecialRequest}</p>
            <CloseButton onClick={closePopup}>Close</CloseButton>
          </Popup>
        </Overlay>
      )}
    </div>
  );
};
