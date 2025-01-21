import React, { useState } from "react";
import roomsData from "../data/Rooms.json";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { GenericTable } from "../components/common/GenericTable.jsx";
import {Table,TableHeader,TableRow,TableData,GuestContainer,RoomImage} from "../styles/TableStyles.js";
import { TabsContainer, Tab, ActionButton } from "../styles/TabsStyles.js";
import { GenericButton } from "../components/common/GenericButton.jsx";

export const Rooms = () => {
  const [activeTab, setActiveTab] = useState("allRooms"); 
  const [sortBy, setSortBy] = useState(null); 
  const [sortOrder, setSortOrder] = useState("asc"); 

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedRooms = [...roomsData]
    .filter((room) => {
      if (activeTab === "availableRooms") return room.status === "Available";
      if (activeTab === "bookedRooms") return room.status === "Booked";
      return true;
    })
    .sort((a, b) => {
      if (!sortBy) return 0; 
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (sortBy === "rate" || sortBy === "offerPrice") {
        return sortOrder === "asc"
          ? parseFloat(valueA) - parseFloat(valueB)
          : parseFloat(valueB) - parseFloat(valueA);
      }

      if (sortBy === "status") {
        const statusOrder = {
          available: 1,
          booked: 2,
        };

        const normalizedA = valueA.toLowerCase();
        const normalizedB = valueB.toLowerCase();

        return sortOrder === "asc"
          ? statusOrder[normalizedA] - statusOrder[normalizedB]
          : statusOrder[normalizedB] - statusOrder[normalizedA];
      }

      return 0;
    });

  const headers = [
    "Photo",
    "Room Number",
    "Bed Type",
    "Facilities",
    "Rate",
    "Offer Price",
    "Status",
  ];

  const renderRow = (room) => {
    const discountPercentage = Math.round(
      ((parseFloat(room.rate) - parseFloat(room.offerPrice)) / parseFloat(room.rate)) * 100
    );

    return (
      <>
        <TableData>
          <GuestContainer>
            <RoomImage src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
          </GuestContainer>
        </TableData>
        <TableData>{room.roomNumber}</TableData>
        <TableData>{room.bedType}</TableData>
        <TableData>{room.facilities}</TableData>
        <TableData>{room.rate}</TableData>
        <TableData>
          {room.offerPrice}{" "}
          <span style={{ color: "#E23428", fontSize: "0.9rem" }}>
            ({discountPercentage}% off)
          </span>
        </TableData>
        <TableData>
          <GenericButton variant={room.status.toLowerCase()}>
            {room.status}
          </GenericButton>
        </TableData>
      </>
    );
  };

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
              isActive={activeTab === "allRooms"}
              onClick={() => handleTabChange("allRooms")}
            >
              All Rooms
            </Tab>
            <Tab
              isActive={activeTab === "availableRooms"}
              onClick={() => handleTabChange("availableRooms")}
            >
              Available Rooms
            </Tab>
            <Tab
              isActive={activeTab === "bookedRooms"}
              onClick={() => handleTabChange("bookedRooms")}
            >
              Booked Rooms
            </Tab>
          </div>
        </div>
      </TabsContainer>

      <div style={{ margin: "1rem 0", textAlign: "right" }}>
        <ActionButton>+ New Room</ActionButton>
      </div>

      <Table>
        <thead>
          <TableRow>
            {headers.map((header, index) => (
              <TableHeader
                key={index}
                onClick={() =>
                  header === "Rate" || header === "Status"
                    ? handleSort(header.toLowerCase().replace(" ", ""))
                    : null
                }
                style={{ cursor: header === "Rate" || header === "Status" ? "pointer" : "default" }}
              >
                {header}{" "}
                {(header === "Rate" || header === "Status") && (
                  <>
                    {sortBy === header.toLowerCase().replace(" ", "") ? (
                      sortOrder === "asc" ? (
                        <FaArrowUp style={{ fontSize: "12px", marginLeft: "5px" }} />
                      ) : (
                        <FaArrowDown style={{ fontSize: "12px", marginLeft: "5px" }} />
                      )
                    ) : (
                      <FaArrowUp style={{ fontSize: "12px", marginLeft: "5px", color: "#ccc" }} />
                    )}
                  </>
                )}
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {sortedRooms.map((room, index) => (
            <TableRow key={index}>{renderRow(room)}</TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
