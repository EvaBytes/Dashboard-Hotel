import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import bookingsData from "../../data/Bookings.json";
import {TabsContainer,Tab,SearchContainer,SearchInput,SearchIconWrapper,ActionButton} from "../../styles/TabsStyles.js";
import {Table,TableHeader,TableRow,TableData,GuestContainer,GuestImage,GuestInfo,StatusBadge,PaginationContainer,PageButton,ActionMenu,ActionMenuItem} from "../../styles/TableStyles.js";
import { Overlay, Popup, CloseButton } from "../../styles/PopupStyles.js";

export const Bookings = () => {
  const [activeTab, setActiveTab] = useState("allBookings");
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [popupData, setPopupData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const itemsPerPage = 10;
  const pagesPerBlock = 4;

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

  const handleMenuToggle = (id) => {
    setMenuOpen((prevMenu) => (prevMenu === id ? null : id));
  };

  const handleEdit = (reservationId) => {
    navigate(`/guest-details/${reservationId}`);
  };

  const handleDelete = (reservationId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      console.log(`Booking with ID ${reservationId} deleted.`);
    }
  };

  const handleNewBooking = () => {
    navigate("/new-booking");
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

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPage = (currentBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const headers = [
    { label: "Guest", key: null },
    { label: "Order Date", key: "orderDate" },
    { label: "Check In", key: "checkIn" },
    { label: "Check Out", key: "checkOut" },
    { label: "Special Request", key: null },
    { label: "Room Type", key: null },
    { label: "Status", key: null },
    { label: "Actions", key: null },
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
        <ActionButton onClick={() => setPopupData(booking.specialRequest)}>
          View Notes
        </ActionButton>
      </TableData>
      <TableData>{booking.roomType}</TableData>
      <TableData>
        <StatusBadge $status={booking.status}>{booking.status}</StatusBadge>
      </TableData>
      <TableData>
        <div style={{ position: "relative" }}>
          <HiOutlineDotsVertical
            size={18}
            onClick={() => handleMenuToggle(booking.guest.reservationNumber)}
            style={{ cursor: "pointer" }}
          />
          {menuOpen === booking.guest.reservationNumber && (
            <ActionMenu>
              <ActionMenuItem onClick={() => handleEdit(booking.guest.reservationNumber)}>
                <FaPencilAlt /> Edit
              </ActionMenuItem>
              <ActionMenuItem onClick={() => handleDelete(booking.guest.reservationNumber)}>
                <FaTrashAlt /> Delete
              </ActionMenuItem>
            </ActionMenu>
          )}
        </div>
      </TableData>
    </>
  );

  return (
    <div>
      <TabsContainer>
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
      </TabsContainer>

      <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem 0" }}>
        <ActionButton onClick={handleNewBooking}>+ New Booking</ActionButton>
      </div>

      <Table>
        <thead>
          <TableRow>
            {headers.map((header, index) => (
              <TableHeader
                key={index}
                onClick={() => header.key && handleSort(header.key)}
                style={{ cursor: header.key ? "pointer" : "default" }}
              >
                {header.label}
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {currentData.map((booking, index) => (
            <TableRow key={index}>{renderRow(booking)}</TableRow>
          ))}
        </tbody>
      </Table>

      <PaginationContainer>
        <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </PageButton>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page) => (
          <PageButton
            key={page}
            $active={currentPage === page}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PageButton>
        ))}
        <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </PageButton>
      </PaginationContainer>

      {popupData && (
        <Overlay>
          <Popup>
            <h3>Special Request</h3>
            <p>{popupData}</p>
            <CloseButton onClick={() => setPopupData(null)}>Close</CloseButton>
          </Popup>
        </Overlay>
      )}
    </div>
  );
};
