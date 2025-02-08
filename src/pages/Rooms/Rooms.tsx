import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSortUp, FaSortDown, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TabsContainer, Tab, AddButton } from "../../styles/TabsStyles.ts";
import { GenericTable } from "../../components/common/GenericTable.tsx";
import { RoomImage, DiscountSpan, StatusButton, SortIcon, IconContainer, ActionMenu, ActionMenuItem } from "../../styles/TableStyles.ts";
import { setActiveTab, setSortBy, setError } from "../../redux/slices/roomsSlice.ts";
import { fetchRooms, deleteRoom } from "../../redux/thunks/roomsThunks.ts";
import { Room } from "../../interfaces/room/RoomState.ts";
import { AppDispatch, RootState } from "../../redux/store.ts";
import Swal from "sweetalert2";

export const Rooms = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { rooms, filteredRooms, activeTab, sortBy, sortOrder, loading, error } = useSelector((state: RootState) => state.rooms);

  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchRooms());
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

  const handleTabChange = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  const handleSort = (column: string) => {
    dispatch(setSortBy(column));
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
      confirmButtonColor: "#3085d6",
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

  const headers = [
    { label: "Photo", key: null },
    { label: "Room Number", key: "roomNumber" },
    { label: "Room Type", key: "roomType" },
    { label: "Amenities", key: "facilities" },
    {
      label: (
        <div onClick={() => handleSort("rate")} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          Rate
          <SortIcon $active={sortBy === "rate"} $sortOrder={sortOrder}>
            {sortBy === "rate" && sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
          </SortIcon>
        </div>
      ),
      key: "rate",
      sortable: true,
    },
    { label: "Offer Price", key: "offerPrice" },
    {
      label: (
        <div onClick={() => handleSort("status")} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          Status
          <SortIcon $active={sortBy === "status"} $sortOrder={sortOrder}>
            {sortBy === "status" && sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
          </SortIcon>
        </div>
      ),
      key: "status",
      sortable: true,
    },
    { label: "Actions", key: null },
  ];

  const renderRow = (room: Room) => {
    const discountPercentage = Math.round(
      ((parseFloat(room.rate) - parseFloat(room.offerPrice)) / parseFloat(room.rate)) * 100
    );

    return (
      <>
        <td>
          <RoomImage src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
        </td>
        <td align="center">{room.roomNumber}</td>
        <td>{room.roomType}</td>
        <td>{room.facilities}</td>
        <td>{room.rate}</td>
        <td>
          {room.offerPrice} <DiscountSpan>({discountPercentage}% off)</DiscountSpan>
        </td>
        <td>
          <StatusButton $status={room.status}>{room.status}</StatusButton>
        </td>
        <td>
          <IconContainer>
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
                <button
                  onClick={() => {
                    handleEdit(room);
                    setMenuOpen(null);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "0.5rem",
                  }}
                >
                  <FaPencilAlt style={{ marginRight: "0.5rem" }} /> Edit
                </button>
                <ActionMenuItem onClick={() => handleDelete(room.roomNumber)}>
                  <FaTrashAlt /> Delete
                </ActionMenuItem>
              </ActionMenu>
            )}
          </IconContainer>
        </td>
      </>
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

      {loading === "pending" && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <GenericTable headers={headers} data={filteredRooms} renderRow={renderRow} itemsPerPage={10} onSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} />
    </div>
  );
};