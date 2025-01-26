import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import bookingsData from "../../data/Bookings.json";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPencilAlt, FaTrashAlt, FaSortUp, FaSortDown } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import {setBookings,setActiveTab,setSearchText,setSortBy,setCurrentPage,deleteBooking} from "../../redux/slices/bookingsSlice.js";
import {TabsContainer,Tab,SearchContainer,SearchInput,SearchIconWrapper,ActionButton} from "../../styles/TabsStyles.js";
import {Table,TableHeader,TableRow,TableData,GuestContainer,GuestImage,GuestInfo,StatusBadge,PaginationContainer,PageButton,ActionMenu,ActionMenuItem} from "../../styles/TableStyles.js";
import { Overlay, Popup, CloseButton } from "../../styles/PopupStyles.js";

export const Bookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [popupData, setPopupData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [pageRange, setPageRange] = useState({ start: 1, end: 4 });

  const activeTab = useSelector((state) => state.bookings.activeTab);
  const searchText = useSelector((state) => state.bookings.searchText);
  const sortBy = useSelector((state) => state.bookings.sortBy);
  const sortOrder = useSelector((state) => state.bookings.sortOrder);
  const currentPage = useSelector((state) => state.bookings.currentPage);
  const itemsPerPage = useSelector((state) => state.bookings.itemsPerPage);
  const filteredBookings = useSelector((state) => state.bookings.filteredBookings);

  useEffect(() => {
    console.log("Bookings Data:", bookingsData);
    dispatch(setBookings(bookingsData));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest(".action-menu")) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  const currentData = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handleEdit = (reservationId) => {
    navigate(`/guest/${reservationId}`);
  };

  const handleDelete = (reservationId) => {
    dispatch(deleteBooking(reservationId));
    console.log("Delete booking:", reservationId);
  };

  const handleNextRange = () => {
    setPageRange((prev) => ({
      start: prev.start + 4,
      end: Math.min(prev.end + 4, totalPages),
    }));
  };

  const handlePrevRange = () => {
    setPageRange((prev) => ({
      start: Math.max(prev.start - 4, 1),
      end: prev.end - 4,
    }));
  };

  const handleSort = (field) => {
    dispatch(setSortBy(field));
  };

  const renderRow = (booking) => (
    <>
      <TableData>
        <GuestContainer>
          <GuestImage
            src={booking.guest?.image || "/default-image.png"}
            alt="Guest"
            onError={(e) => {
              e.target.src = "/default-image.png";
            }}
          />
          <GuestInfo>
            {booking.guest?.fullName || "No name"}
            <br />
            <small>{booking.guest?.reservationNumber || "No reservation number"}</small>
          </GuestInfo>
        </GuestContainer>
      </TableData>
      <TableData>
        {booking.orderDate && !isNaN(new Date(booking.orderDate).getTime())
          ? format(new Date(booking.orderDate), "MMM dd, yyyy hh:mm a")
          : "Invalid date"}
      </TableData>
      <TableData>
        {booking.checkIn && !isNaN(new Date(booking.checkIn).getTime())
          ? format(new Date(booking.checkIn), "MMM dd, yyyy")
          : "Invalid date"}
      </TableData>
      <TableData>
        {booking.checkOut && !isNaN(new Date(booking.checkOut).getTime())
          ? format(new Date(booking.checkOut), "MMM dd, yyyy")
          : "Invalid date"}
      </TableData>
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
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(menuOpen === booking.guest.reservationNumber ? null : booking.guest.reservationNumber);
            }}
            style={{ cursor: "pointer" }}
          />
          {menuOpen === booking.guest.reservationNumber && (
            <ActionMenu className="action-menu">
              <ActionMenuItem onClick={() => handleEdit(booking.guest.reservationNumber)}>
                <FaPencilAlt /> Details
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
          onClick={() => dispatch(setActiveTab("allBookings"))}
        >
          All Bookings
        </Tab>
        <Tab
          $isActive={activeTab === "checkIn"}
          onClick={() => dispatch(setActiveTab("checkIn"))}
        >
          Check-In
        </Tab>
        <Tab
          $isActive={activeTab === "checkOut"}
          onClick={() => dispatch(setActiveTab("checkOut"))}
        >
          Check-Out
        </Tab>
        <Tab
          $isActive={activeTab === "inProgress"}
          onClick={() => dispatch(setActiveTab("inProgress"))}
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
            onChange={(e) => dispatch(setSearchText(e.target.value))}
          />
        </SearchContainer>
      </TabsContainer>

      <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem 0" }}>
        <ActionButton onClick={() => navigate("/new-booking")}>+ New Booking</ActionButton>
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Guest</TableHeader>
            <TableHeader onClick={() => handleSort("orderDate")}>
              Order Date
              {sortBy === "orderDate" && (
                <span>
                  {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
                </span>
              )}
            </TableHeader>
            <TableHeader onClick={() => handleSort("checkIn")}>
              Check In
              {sortBy === "checkIn" && (
                <span>
                  {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
                </span>
              )}
            </TableHeader>
            <TableHeader onClick={() => handleSort("checkOut")}>
              Check Out
              {sortBy === "checkOut" && (
                <span>
                  {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
                </span>
              )}
            </TableHeader>
            <TableHeader>Special Request</TableHeader>
            <TableHeader>Room Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentData && currentData.length > 0 ? (
            currentData.map((booking) => (
              <TableRow key={booking.guest?.reservationNumber || Math.random()}>
                {renderRow(booking)}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableData colSpan="8" style={{ textAlign: "center" }}>
                No bookings found.
              </TableData>
            </TableRow>
          )}
        </tbody>
      </Table>

      <PaginationContainer>
        <PageButton onClick={handlePrevRange} disabled={pageRange.start === 1 || totalPages === 0}>
          Prev
        </PageButton>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(pageRange.start - 1, pageRange.end)
          .map((page) => (
            <PageButton
              key={page}
              $active={currentPage === page}
              onClick={() => dispatch(setCurrentPage(page))}
            >
              {page}
            </PageButton>
          ))}
        <PageButton onClick={handleNextRange} disabled={pageRange.end >= totalPages || totalPages === 0}>
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