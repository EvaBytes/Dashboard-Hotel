import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu"; 
import bookingsData from "../data/Bookings.json";
import {Table,TableHeader,TableRow, TableData,GuestContainer, GuestImage, GuestInfo,StatusBadge, SortIcon} from "../styles/TableStyles.js";
import {TabsContainer,Tab,SearchContainer,SearchInput,SearchIconWrapper,ActionButton} from "../styles/TabsStyles.js";

export const Bookings = () => {
  const [activeTab, setActiveTab] = useState("allBookings");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleSearchChange = (event) =>
    setSearchText(event.target.value.toLowerCase());

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const cleanedData = bookingsData.map((booking) => ({
    ...booking,
    orderDate: new Date(booking.orderDate.trim()),
    checkIn: new Date(booking.checkIn.trim()),
    checkOut: new Date(booking.checkOut.trim()),
  }));

  const sortedData = cleanedData
    .filter((booking) =>
      booking.guest.fullName.toLowerCase().includes(searchText)
    )
    .sort((a, b) => {
      if (!sortBy) return 0;
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA instanceof Date && valueB instanceof Date) {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });

  const headers = [
    { label: "Guest", key: null },
    { label: "Order Date", key: "orderDate" },
    { label: "Check In", key: "checkIn" },
    { label: "Check Out", key: "checkOut" },
    { label: "Special Request", key: null },
    { label: "Room Type", key: null },
    { label: "Status", key: null },
    { label: "", key: null },
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
        <ActionButton
          variant="default"
          onClick={() => alert(booking.specialRequest)}
        >
          View Notes
        </ActionButton>
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
        <ActionButton onClick={() => navigate("/new-room")}>
          + New Room
        </ActionButton>
      </div>

      <Table>
        <thead>
          <TableRow>
            {headers.map((header, index) => (
              <TableHeader
                key={index}
                onClick={() =>
                  header.key ? handleSort(header.key) : null
                }
                style={{
                  cursor: header.key ? "pointer" : "default",
                }}
              >
                {header.label}
                {header.key && (
                  <SortIcon>
                    {sortBy === header.key ? (
                      sortOrder === "asc" ? (
                        <FaArrowUp />
                      ) : (
                        <FaArrowDown />
                      )
                    ) : (
                      <FaArrowUp style={{ color: "#ccc" }} />
                    )}
                  </SortIcon>
                )}
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {sortedData.map((booking, index) => (
            <TableRow key={index}>{renderRow(booking)}</TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};