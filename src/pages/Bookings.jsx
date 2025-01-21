import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import bookingsData from "../data/Bookings.json";
import {TabsContainer,Tab,SearchContainer,SearchInput,SearchIconWrapper,ActionButton,} from "../styles/TabsStyles.js";
import {Table,TableHeader,TableRow,TableData,GuestContainer, GuestImage,GuestInfo,StatusBadge,SortIcon,} from "../styles/TableStyles.js";

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

  const filteredData = cleanedData.filter((booking) => {
    if (activeTab === "checkIn") return booking.status === "Check-In";
    if (activeTab === "checkOut") return booking.status === "Check-Out";
    if (activeTab === "inProgress") return booking.status === "In Progress";
    return true;
  });

  const searchedData = filteredData.filter((booking) =>
    booking.guest.fullName.toLowerCase().includes(searchText)
  );

  const sortedData = [...searchedData].sort((a, b) => {
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
    {
      label: (
        <>
          Order Date{" "}
          <SortIcon>
            {sortBy === "orderDate" && sortOrder === "asc" && <FaArrowUp />}
            {sortBy === "orderDate" && sortOrder === "desc" && <FaArrowDown />}
            {sortBy !== "orderDate" && <FaArrowUp style={{ color: "#ccc" }} />}
          </SortIcon>
        </>
      ),
      key: "orderDate",
    },
    {
      label: (
        <>
          Check In{" "}
          <SortIcon>
            {sortBy === "checkIn" && sortOrder === "asc" && <FaArrowUp />}
            {sortBy === "checkIn" && sortOrder === "desc" && <FaArrowDown />}
            {sortBy !== "checkIn" && <FaArrowUp style={{ color: "#ccc" }} />}
          </SortIcon>
        </>
      ),
      key: "checkIn",
    },
    {
      label: (
        <>
          Check Out{" "}
          <SortIcon>
            {sortBy === "checkOut" && sortOrder === "asc" && <FaArrowUp />}
            {sortBy === "checkOut" && sortOrder === "desc" && <FaArrowDown />}
            {sortBy !== "checkOut" && <FaArrowUp style={{ color: "#ccc" }} />}
          </SortIcon>
        </>
      ),
      key: "checkOut",
    },
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
        <ActionButton onClick={() => alert(booking.specialRequest)}>
          View Notes
        </ActionButton>
      </TableData>
      <TableData>{booking.roomType}</TableData>
      <TableData>
        <StatusBadge $status={booking.status}>{booking.status}</StatusBadge>
      </TableData>
      <TableData>
        <HiOutlineDotsVertical
          size={16}
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Tab
              $isActive={activeTab === "allBookings"}
              onClick={() => handleTabChange("allBookings")}
            >
              All Bookings
            </Tab>
            <Tab
              $isActive={activeTab === "checkIn"}
              onClick={() => handleTabChange("checkIn")}
            >
              Check-In
            </Tab>
            <Tab
              $isActive={activeTab === "checkOut"}
              onClick={() => handleTabChange("checkOut")}
            >
              Check-Out
            </Tab>
            <Tab
              $isActive={activeTab === "inProgress"}
              onClick={() => handleTabChange("inProgress")}
            >
              In Progress
            </Tab>
          </div>
          <SearchContainer>
            <SearchIconWrapper>
              <LuUserRoundSearch size={18} />
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
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem 0" }}>
        <ActionButton onClick={() => navigate("/new-booking")}>
          + New Booking
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
