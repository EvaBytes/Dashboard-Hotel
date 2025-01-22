import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {NewRoomContainer, RoomInfoCard,RoomHeader,RoomDetailsSection,SaveButton, BackButton} from "../../styles/NewRoomStyles.js";

const NewRoom = () => {
  const [roomData, setRoomData] = useState({
    roomType: "",
    roomNumber: "",
    description: "",
    offer: "NO",
    price: "",
    discount: "",
    cancellationPolicy: "",
    amenities: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveRoom = (e) => {
    e.preventDefault();
    const existingRooms = JSON.parse(localStorage.getItem("rooms")) || [];
    const updatedRooms = [...existingRooms, roomData];
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    alert("New room added successfully!");
    navigate("/rooms");
  };

  return (
    <NewRoomContainer>
      <RoomInfoCard>
        <RoomHeader>
          <h2>New Room</h2>
        </RoomHeader>
        <form onSubmit={handleSaveRoom}>
          <RoomDetailsSection>
            <label>Room Type</label>
            <select
              name="roomType"
              value={roomData.roomType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Double Superior">Double Superior</option>
              <option value="Suite">Suite</option>
            </select>

            <label>Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={roomData.roomNumber}
              onChange={handleInputChange}
              required
            />

            <label>Description</label>
            <textarea
              rows="3"
              name="description"
              value={roomData.description}
              onChange={handleInputChange}
              required
            />

            <label>Offer</label>
            <select
              name="offer"
              value={roomData.offer}
              onChange={handleInputChange}
            >
              <option value="NO">NO</option>
              <option value="YES">YES</option>
            </select>

            <label>Price</label>
            <input
              type="text"
              name="price"
              value={roomData.price}
              onChange={handleInputChange}
              required
            />

            <label>Discount (%)</label>
            <input
              type="text"
              name="discount"
              value={roomData.discount}
              onChange={handleInputChange}
            />

            <label>Cancellation Policy</label>
            <textarea
              rows="2"
              name="cancellationPolicy"
              value={roomData.cancellationPolicy}
              onChange={handleInputChange}
              required
            />

            <label>Amenities</label>
            <input
              type="text"
              name="amenities"
              placeholder="Comma separated (e.g. WiFi, Pool, Gym)"
              value={roomData.amenities}
              onChange={handleInputChange}
              required
            />
          </RoomDetailsSection>
          <SaveButton type="submit">Save Room</SaveButton>
          <BackButton type="button" onClick={() => navigate("/rooms")}>
            Cancel
          </BackButton>
        </form>
      </RoomInfoCard>
    </NewRoomContainer>
  );
};

export { NewRoom };
