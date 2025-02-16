import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPencilAlt, FaTrashAlt, FaSortUp, FaSortDown } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import { setActiveTab, setSearchText, setSortBy, setSortOrder, setCurrentPage, setError } from "../../redux/slices/bookingsSlice";
import { deleteBooking, fetchAllBookings } from "../../redux/thunks/bookingsThunks";
import { TabsContainer, Tab, SearchContainer, SearchInput, SearchIconWrapper, ActionButton, AddButton } from "../../styles/TabsStyles";
import { Table, TableHeader, TableRow, TableData, GuestContainer, GuestImage, GuestInfo, StatusBadge, PaginationContainer, PageButton, ActionMenu, ActionMenuItem, SortIcon } from "../../styles/TableStyles";
import { Overlay, Popup, CloseButton } from "../../styles/PopupStyles";
import { RootState, AppDispatch } from "../../redux/store";
import { Booking } from "../../interfaces/bookings/BookingState";
import Swal from "sweetalert2";

export const Bookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [popupData, setPopupData] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [pageRange, setPageRange] = useState<{ start: number; end: number }>({ start: 1, end: 4 });

  const { activeTab, searchText, sortBy, sortOrder, currentPage, itemsPerPage, filteredBookings, loading, error } 
    = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      }).then(() => {
        dispatch(setError(null));
      });
    }
  }, [error, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && !(e.target as HTMLElement).closest(".action-menu")) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  const currentData = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handleDelete = (reservationId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0e4636",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBooking(reservationId))
          .then(() => {
            Swal.fire("Deleted!", "The booking has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the booking.", "error");
          });
      }
    });
  };
  const handleSort = (field: string) => {
    if (sortBy === field) {
      dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
    } else {
      dispatch(setSortBy(field));
      dispatch(setSortOrder("asc"));
    }
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

  const renderRow = (booking: Booking) => (
    <TableRow key={booking.guest?.reservationNumber || Math.random()}>
      <TableData>
        <GuestContainer>
          <GuestImage
            src={booking.guest?.image || "/Profile1.png"}
            alt="Guest"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/Profile1.png";
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
            size={16}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(menuOpen === booking.guest?.reservationNumber ? null : booking.guest?.reservationNumber);
            }}
            style={{ cursor: "pointer" }}
          />
          {menuOpen === booking.guest?.reservationNumber && (
            <ActionMenu className="action-menu">
              <ActionMenuItem onClick={() => navigate(`/guest/${booking.guest?.reservationNumber}`)}>
                <FaPencilAlt /> Details
              </ActionMenuItem>
              <ActionMenuItem onClick={() => handleDelete(booking.guest?.reservationNumber)}>
                <FaTrashAlt /> Delete
              </ActionMenuItem>
            </ActionMenu>
          )}
        </div>
      </TableData>
    </TableRow>
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
        <AddButton onClick={() => navigate("/new-booking")}>+ New Booking</AddButton>
      </div>

      <Table>
        <thead>
          <TableRow>
          <TableHeader $sortable={true}>Guest</TableHeader>
          <TableHeader 
            $sortable={true} 
            $active={sortBy === "orderDate"}
            onClick={() => handleSort("orderDate")}
          >
            Order Date
            <SortIcon $active={sortBy === "orderDate"} $sortOrder={sortOrder}>
              {sortBy === "orderDate" && sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
            </SortIcon>
          </TableHeader>
          <TableHeader 
            $sortable={true} 
            $active={sortBy === "checkIn"}
            onClick={() => handleSort("checkIn")}
          >
            Check In
            <SortIcon $active={sortBy === "checkIn"} $sortOrder={sortOrder}>
              {sortBy === "checkIn" && sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
            </SortIcon>
          </TableHeader>
          <TableHeader 
            $sortable={true} 
            $active={sortBy === "checkOut"}
            onClick={() => handleSort("checkOut")}
          >
            Check Out
            <SortIcon $active={sortBy === "checkOut"} $sortOrder={sortOrder}>
              {sortBy === "checkOut" && sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
            </SortIcon>
          </TableHeader>
            <TableHeader $sortable={true}>Special Request</TableHeader>
            <TableHeader $sortable={true}>Room Type</TableHeader>
            <TableHeader $sortable={true}>Status</TableHeader>
            <TableHeader $sortable={true}>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {loading === "pending" ? ( 
            <TableRow>
              <TableData>
                Loading bookings...
              </TableData>
            </TableRow>
          ) : currentData.length > 0 ? ( 
            currentData.map((booking) => renderRow(booking))
          ) : ( 
            <TableRow>
              <TableData>
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