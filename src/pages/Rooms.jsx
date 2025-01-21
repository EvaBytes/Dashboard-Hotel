import React, { useState } from "react";
import roomsData from "../data/Rooms.json";
import { GenericTable } from "../components/common/GenericTable.jsx";
import {TableData,GuestContainer,RoomImage} from "../styles/TableStyles.js";
import {TabsContainer,Tab,ActionButton} from "../styles/TabsStyles.js";
import { GenericButton } from "../components/common/GenericButton.jsx";

export const Rooms = () => {
  const [activeTab, setActiveTab] = useState("allRooms"); 
  const [isNewRoomOpen, setIsNewRoomOpen] = useState(false); 

  const handleTabChange = (tab) => setActiveTab(tab);

  const filteredRooms = roomsData.filter((room) => {
    if (activeTab === "availableRooms") return room.status === "Available";
    if (activeTab === "bookedRooms") return room.status === "Booked";
    return true; 
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

  const renderRow = (room) => (
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
      <TableData>{room.offerPrice}</TableData>
      <TableData>
        <GenericButton variant={room.status.toLowerCase()}>
          {room.status === "Available" ? "Available" : "Booked"}
        </GenericButton>
      </TableData>
    </>
  );

  return (
    <div>
      {/* Tabs */}
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
        <ActionButton onClick={() => setIsNewRoomOpen(true)}>
          + New Room
        </ActionButton>
      </div>

      <GenericTable
        headers={headers}
        data={filteredRooms}
        renderRow={renderRow}
        itemsPerPage={10}
      />

      {isNewRoomOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            <h3>Add New Room</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newRoom = {
                  roomPhoto: "https://via.placeholder.com/150", // Placeholder
                  roomNumber: formData.get("roomNumber"),
                  bedType: formData.get("bedType"),
                  facilities: formData.get("facilities"),
                  rate: formData.get("rate"),
                  offerPrice: formData.get("offerPrice"),
                  status: formData.get("status"),
                };
                roomsData.push(newRoom); 
                setIsNewRoomOpen(false); 
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Room Number:
                  <input
                    type="text"
                    name="roomNumber"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Bed Type:
                  <input
                    type="text"
                    name="bedType"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Facilities:
                  <input
                    type="text"
                    name="facilities"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Rate:
                  <input
                    type="text"
                    name="rate"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Offer Price:
                  <input
                    type="text"
                    name="offerPrice"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Status:
                  <select
                    name="status"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                  </select>
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <ActionButton
                  type="button"
                  onClick={() => setIsNewRoomOpen(false)}
                >
                  Cancel
                </ActionButton>
                <ActionButton type="submit">Submit</ActionButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
