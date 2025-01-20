import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuUserRoundSearch } from "react-icons/lu";
import bookingsData from "../data/Bookings.json";
import { GenericTable } from "../components/common/GenericTable.jsx";
import { GenericButton } from "../components/common/GenericButton.jsx";
import {TabsContainer,Tab,SearchContainer,SearchInput,SearchIconWrapper,ActionButton} from "../styles/TabsStyles.js";
import {TableData,GuestContainer,GuestImage,GuestInfo,StatusBadge} from "../styles/TableStyles.js";
import { Overlay, Popup, CloseButton } from "../styles/PopupStyles.js";

export const Bookings = () => {
  const [activeTab, setActiveTab] = useState("allBookings");
  const [searchText, setSearchText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [currentSpecialRequest, setCurrentSpecialRequest] = useState("");
  const navigate = useNavigate();

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleSearchChange = (event) =>
    setSearchText(event.target.value.toLowerCase());

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
      if (activeTab === "checkIn") return true;
      if (activeTab === "checkOut") return true;
      if (activeTab === "inProgress") return true;
      return true;
    })
    .filter((booking) =>
      booking.guest.fullName.toLowerCase().includes(searchText)
    )
    .sort((a, b) => {
      if (activeTab === "checkIn") return b.checkIn - a.checkIn;
      if (activeTab === "checkOut") return b.checkOut - a.checkOut;
      if (activeTab === "inProgress") return b.orderDate - a.orderDate;
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
        <GenericButton
          variant="default"
          onClick={() => openPopup(booking.specialRequest)}
        >
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
          onClick={() =>
            navigate(`/guest-details/${booking.guest.reservationNumber}`)
          }
        />
      </TableData>
    </>
  );

  return (
    <div>
      {/* Tabs */}
      <TabsContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            <Tab
              isActive={activeTab === "allBookings"}
              onClick={() => handleTabChange("allBookings")}
            >
              All Bookings
            </Tab>
            <Tab
              isActive={activeTab === "checkIn"}
              onClick={() => handleTabChange("checkIn")}
            >
              Check-In
            </Tab>
            <Tab
              isActive={activeTab === "checkOut"}
              onClick={() => handleTabChange("checkOut")}
            >
              Check-Out
            </Tab>
            <Tab
              isActive={activeTab === "inProgress"}
              onClick={() => handleTabChange("inProgress")}
            >
              In Progress
            </Tab>
          </div>
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
        </div>
      </TabsContainer>

      <div style={{ margin: "1rem 0", textAlign: "right" }}>
        <ActionButton onClick={() => setIsNewBookingOpen(true)}>
          + New Booking
        </ActionButton>
      </div>

      <GenericTable
        headers={headers}
        data={filteredData}
        renderRow={renderRow}
        itemsPerPage={10}
      />

      {isNewBookingOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            <h3>Add New Booking</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newBooking = {
                  guest: {
                    fullName: formData.get("guestName"),
                    reservationNumber: formData.get("reservationId"),
                    image: "https://via.placeholder.com/150", 
                  },
                  orderDate: formData.get("orderDate"),
                  checkIn: formData.get("checkIn"),
                  checkOut: formData.get("checkOut"),
                  specialRequest: formData.get("specialRequest"),
                  roomType: formData.get("roomType"),
                  status: formData.get("status"),
                };
                bookingsData.push(newBooking);
                setIsNewBookingOpen(false);
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Guest Name:
                  <input
                    type="text"
                    name="guestName"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Reservation ID:
                  <input
                    type="text"
                    name="reservationId"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Order Date:
                  <input
                    type="date"
                    name="orderDate"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Check-In:
                  <input
                    type="date"
                    name="checkIn"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Check-Out:
                  <input
                    type="date"
                    name="checkOut"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Special Request:
                  <textarea
                    name="specialRequest"
                    style={{ width: "100%", padding: "0.5rem" }}
                  ></textarea>
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Room Type:
                  <input
                    type="text"
                    name="roomType"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Status:
                  <select
                    name="status"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  >
                    <option value="Check-In">Check-In</option>
                    <option value="Check-Out">Check-Out</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <ActionButton
                  type="button"
                  onClick={() => setIsNewBookingOpen(false)}
                >
                  Cancel
                </ActionButton>
                <ActionButton type="submit">Submit</ActionButton>
              </div>
            </form>
          </div>
        </div>
      )}

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
