import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import roomsData from "../../data/Rooms.json";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { TabsContainer, Tab, ActionButton } from "../../styles/TabsStyles.js";
import { GenericTable } from "../../components/common/GenericTable.jsx";
import { RoomImage, DiscountSpan, StatusButton, SortIcon } from "../../styles/TableStyles.js";

export const Rooms = () => {
  const [activeTab, setActiveTab] = useState("allRooms");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate(); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const filteredRooms = roomsData.filter((room) => {
    if (activeTab === "availableRooms") return room.status === "Available";
    if (activeTab === "bookedRooms") return room.status === "Booked";
    return true;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (!sortBy) return 0;

    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (sortBy === "rate") {
      return sortOrder === "asc"
        ? parseFloat(valueA) - parseFloat(valueB)
        : parseFloat(valueB) - parseFloat(valueA);
    }

    if (sortBy === "status") {
      const statusOrder = { Available: 1, Booked: 2, Maintenance: 3 };
      return sortOrder === "asc"
        ? statusOrder[valueA] - statusOrder[valueB]
        : statusOrder[valueB] - statusOrder[valueA];
    }

    return 0;
  });

  const headers = [
    { label: "Photo", key: null },
    { label: "Room Number", key: "roomNumber" },
    { label: "Room Type", key: "bedType" },
    { label: "Facilities", key: "facilities" },
    {
      label: (
        <div
          onClick={() => handleSort("rate")}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          Rate
          <SortIcon>
            {sortBy === "rate" && sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
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
            {sortBy === "status" && sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
          </SortIcon>
        </div>
      ),
      key: "status",
      sortable: true,
    },
  ];

  const renderRow = (room) => {
    const discountPercentage = Math.round(
      ((parseFloat(room.rate) - parseFloat(room.offerPrice)) / parseFloat(room.rate)) * 100
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
          <DiscountSpan>
            ({discountPercentage}% off)
          </DiscountSpan>
        </td>
        <td>
          <StatusButton $status={room.status}>{room.status}</StatusButton>
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
        <ActionButton onClick={() => navigate("/new-room")}>+ New Room</ActionButton>
      </div>

      <GenericTable
        headers={headers}
        data={sortedRooms}
        renderRow={renderRow}
        itemsPerPage={10}
      />
    </div>
  );
};
