import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSortUp, FaSortDown, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TabsContainer, Tab, AddButton } from "../../styles/TabsStyles";
import { Table, TableHeader, TableRow, TableData, StatusBadge, PaginationContainer, PageButton, DiscountSpan, ActionMenu, ActionMenuItem, SortIcon, RoomImage } from "../../styles/TableStyles";
import { setActiveTab, setSortBy, setSortOrder, setError, setCurrentPage } from "../../redux/slices/roomsSlice";
import { fetchRooms, deleteRoom, isValidStatus } from "../../redux/thunks/roomsThunks";
import { Room } from "../../interfaces/room/RoomState";
import { AppDispatch, RootState } from "../../redux/store";
import Swal from "sweetalert2";

export const Rooms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [pageRange, setPageRange] = useState<{ start: number; end: number }>({ start: 1, end: 4 });

  const { filteredRooms, activeTab, sortBy, sortOrder, currentPage, itemsPerPage, loading, error } =
    useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms()).then((res) => console.log("Rooms fetched:", res));
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

  const currentData = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  const handleTabChange = (tab: string) => {
    if (tab === "allRooms") {
      dispatch(setActiveTab(tab));
    } else if (isValidStatus(tab)) {
      dispatch(setActiveTab(tab));
    }
  };  

  const handleSort = (column: string) => {
    if (sortBy === column) {
      dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"));
    } else {
      dispatch(setSortBy(column));
      dispatch(setSortOrder("asc"));
    }
  };

  const handleEdit = (room: Room) => {
    navigate(`/room-details/${room.roomNumber}`, { state: { roomData: room } });
  };

  const handleDelete = (roomNumber: string) => {
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
        dispatch(deleteRoom(roomNumber))
          .then(() => {
            Swal.fire("Deleted!", "The room has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the room.", "error");
          });
      }
    });
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

  const renderRow = (room: Room, index: number) => {
    const discountPercentage =
    room.offerPrice && room.rate
      ? Math.round(((parseFloat(room.rate) - parseFloat(room.offerPrice)) / parseFloat(room.rate)) * 100)
      : 0;
  

    return (
      <TableRow key={`${room.roomNumber}-${index}`}>
        <TableData>
        <RoomImage src={room.roomPhoto} alt={`Room ${room.roomNumber}`} width="80"  />
        </TableData>
        <TableData align="center">{room.roomNumber}</TableData>
        <TableData>{room.roomType}</TableData>
        <TableData>
          {Array.isArray(room.facilities)
            ? room.facilities.join(", ")
            : typeof room.facilities === "string"
            ? room.facilities.split(",").join(", ")
            : "N/A"}
        </TableData>
        <TableData>{room.rate}</TableData>
        <TableData>
          <div>
            {room.offerPrice}
            {discountPercentage > 0 && (
              <DiscountSpan>{discountPercentage}% off</DiscountSpan>
            )}
          </div>
        </TableData>
        <TableData>
          <StatusBadge $status={room.status}>{room.status}</StatusBadge>
        </TableData>
        <TableData>
          <div style={{ position: "relative" }}>
            <HiOutlineDotsVertical
              size={16}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(menuOpen === room.roomNumber ? null : room.roomNumber);
              }}
              style={{ cursor: "pointer" }}
            />
            {menuOpen === room.roomNumber && (
              <ActionMenu className="action-menu">
                <ActionMenuItem
                  onClick={() => {
                    handleEdit(room);
                    setMenuOpen(null);
                  }}
                >
                  <FaPencilAlt /> Edit
                </ActionMenuItem>
                <ActionMenuItem onClick={() => handleDelete(room.roomNumber)}>
                  <FaTrashAlt /> Delete
                </ActionMenuItem>
              </ActionMenu>
            )}
          </div>
        </TableData>
      </TableRow>
    );
  };

  return (
    <div>
      <TabsContainer>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div>
            <Tab $isActive={activeTab === "allRooms"} onClick={() => handleTabChange("allRooms")}>
              All Rooms
            </Tab>
            <Tab $isActive={activeTab === "availableRooms"} onClick={() => handleTabChange("availableRooms")}>
              Available
            </Tab>
            <Tab $isActive={activeTab === "bookedRooms"} onClick={() => handleTabChange("bookedRooms")}>
              Booked
            </Tab>
          </div>
        </div>
      </TabsContainer>

      <div style={{ margin: "1rem 0", textAlign: "right" }}>
        <AddButton onClick={() => navigate("/new-room")}>+ New Room</AddButton>
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader $sortable={false}>Photo</TableHeader>
            <TableHeader
              $sortable={true}
              $active={sortBy === "roomNumber"}
              onClick={() => handleSort("roomNumber")}
            >
              Room Number
              <SortIcon $active={sortBy === "roomNumber"} $sortOrder={sortOrder}>
                {sortBy === "roomNumber" && sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
              </SortIcon>
            </TableHeader>
            <TableHeader $sortable={false}>Room Type</TableHeader>
            <TableHeader $sortable={false}>Amenities</TableHeader>
            <TableHeader
              $sortable={true}
              $active={sortBy === "rate"}
              onClick={() => handleSort("rate")}
            >
              Rate
              <SortIcon $active={sortBy === "rate"} $sortOrder={sortOrder}>
                {sortBy === "rate" && sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
              </SortIcon>
            </TableHeader>
            <TableHeader $sortable={false}>Offer Price</TableHeader>
            <TableHeader
              $sortable={true}
              $active={sortBy === "status"}
              onClick={() => handleSort("status")}
            >
              Status
              <SortIcon $active={sortBy === "status"} $sortOrder={sortOrder}>
                {sortBy === "status" && sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
              </SortIcon>
            </TableHeader>
            <TableHeader $sortable={false}>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {loading === "pending" ? (
            <TableRow>
              <TableData colSpan={8}>Loading rooms...</TableData>
            </TableRow>
          ) : currentData.length > 0 ? (
            currentData.map((room, index) => renderRow(room, index))
          ) : (
            <TableRow>
              <TableData colSpan={8}>No rooms found.</TableData>
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
    </div>
  );
};