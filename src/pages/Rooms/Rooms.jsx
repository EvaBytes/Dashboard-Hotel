import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSortUp, FaSortDown, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TabsContainer, Tab, ActionButton } from "../../styles/TabsStyles.js";
import { GenericTable } from "../../components/common/GenericTable.jsx";
import { RoomImage, DiscountSpan, StatusButton, SortIcon, IconContainer, ActionMenu, ActionMenuItem } from "../../styles/TableStyles.js";
import { setActiveTab, setSortBy } from "../../redux/slices/roomsSlice.js";
import { fetchRooms, deleteRoom } from "../../redux/thunks/roomsThunks.js";
import Swal from "sweetalert2";

export const Rooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms, filteredRooms, activeTab, sortBy, sortOrder, loading, error } =
    useSelector((state) => state.rooms);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const handleSort = (column) => {
    dispatch(setSortBy(column));
  };

  const handleEdit = (room) => {
    navigate(`/room-details/${room.roomNumber}`, { state: { roomData: room } });
  };

  const handleDelete = (roomNumber) => {
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
          .catch((error) => {
            Swal.fire("Error!", "Failed to delete the room.", "error");
          });
      }
    });
  };

  const headers = [
    { label: "Photo", key: null },
    { label: "Room Number", key: "roomNumber" },
    { label: "Room Type", key: "bedType" },
    { label: "Amenities", key: "facilities" },
    {
      label: (
        <div
          onClick={() => handleSort("rate")}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          Rate
          <SortIcon>
            {sortBy === "rate" && sortOrder === "asc" ? (
              <FaSortUp />
            ) : (
              <FaSortDown />
            )}
          </SortIcon>
        </div>
      ),
      key: "rate",
      sortable: true,
    },
    { label: "Offer Price", key: "offerPrice" },
    {
      label: (
        <div
          onClick={() => handleSort("status")}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          Status
          <SortIcon>
            {sortBy === "status" && sortOrder === "asc" ? (
              <FaSortUp />
            ) : (
              <FaSortDown />
            )}
          </SortIcon>
        </div>
      ),
      key: "status",
      sortable: true,
    },
    { label: "Actions", key: null },
  ];

  const renderRow = (room) => {
    const discountPercentage = Math.round(
      ((parseFloat(room.rate) - parseFloat(room.offerPrice)) /
        parseFloat(room.rate)) *
        100
    );

    return (
      <>
        <td>
          <RoomImage src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
        </td>
        <td>{room.roomNumber}</td>
        <td>{room.bedType}</td>
        <td>{room.facilities}</td>
        <td>{room.rate}</td>
        <td>
          {room.offerPrice}{" "}
          <DiscountSpan>({discountPercentage}% off)</DiscountSpan>
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
            <Tab
              $isActive={activeTab === "allRooms"}
              onClick={() => handleTabChange("allRooms")}
            >
              All Rooms
            </Tab>
            <Tab
              $isActive={activeTab === "availableRooms"}
              onClick={() => handleTabChange("availableRooms")}
            >
              Available Rooms
            </Tab>
            <Tab
              $isActive={activeTab === "bookedRooms"}
              onClick={() => handleTabChange("bookedRooms")}
            >
              Booked Rooms
            </Tab>
          </div>
        </div>
      </TabsContainer>

      <div style={{ margin: "1rem 0", textAlign: "right" }}>
        <ActionButton onClick={() => navigate("/new-room")}>
          + New Room
        </ActionButton>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <GenericTable
        headers={headers}
        data={filteredRooms}
        renderRow={renderRow}
        itemsPerPage={10}
      />
    </div>
  );
};