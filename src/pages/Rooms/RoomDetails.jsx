import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {RoomDetailsContainer,RoomDetailsCard,RoomDetailsHeader,RoomDetailsSection,SaveButton,BackButton,ImageUploadSection,ImagePreview,AmenitiesContainer,AmenityItem} from "../../styles/RoomDetailsStyles.js";

const roomTypePhotos = {
  "Single Bed": ["/radoslav-bali-hLdeUT_HE2E-unsplash.jpg", "/caroline-voelker-KVXxBwIu8Vw-unsplash.jpg", "/kate-branch-G18uHzrihOE-unsplash.jpg"],
  "Double Bed": ["/radoslav-bali-hLdeUT_HE2E-unsplash.jpg", "/caroline-voelker-KVXxBwIu8Vw-unsplash.jpg", "/kate-branch-G18uHzrihOE-unsplash.jpg"],
  "Double Superior": ["/radoslav-bali-hLdeUT_HE2E-unsplash.jpg", "/caroline-voelker-KVXxBwIu8Vw-unsplash.jpg", "/kate-branch-G18uHzrihOE-unsplash.jpg"],
  "Suite": ["/radoslav-bali-hLdeUT_HE2E-unsplash.jpg", "/caroline-voelker-KVXxBwIu8Vw-unsplash.jpg", "/kate-branch-G18uHzrihOE-unsplash.jpg"],
};

const amenitiesList = ["Air conditioner","High speed WiFi","Breakfast","Kitchen","Cleaning","Shower","Grocery","Single bed","Shop near","Towels","24/7 Online Support","Strong locker","Smart Security","Expert Team"];

const cancellationPolicyText = `
Standard Rate:
The cancellation is free of charge 7 days prior to the date of arrival, after this time we charge you 90% the room rate as cancellation fee, if we could not sell the room more.

Non-Refundable Rate:
For the non refundable bookings are no cancellation or changes possible. In case of a cancellation, 90% of the total amount will be charged as cancellation fee.
`;

const RoomDetails = () => {
  const { roomNumber } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState({
    roomPhoto: "",
    roomNumber: "",
    roomType: "",
    facilities: [],
    rate: "",
    offerPrice: "",
    status: "",
    guest: {
      fullName: "",
      reservationNumber: "",
      image: "",
    },
    orderDate: "",
    checkIn: "",
    checkOut: "",
    description: "",
    offer: "NO",
    discount: "",
    cancellationPolicy: cancellationPolicyText,
    amenities: [], 
  });

  useEffect(() => {
    if (location.state?.roomData) {
      const roomToEdit = location.state.roomData;
      setRoomData({
        ...roomToEdit,
        facilities: roomToEdit.facilities
          ? roomToEdit.facilities.split(",")
          : [],
        amenities: roomToEdit.amenities || [],
        photos: roomTypePhotos[roomToEdit.roomType] || [], 
      });
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({
      ...prev,
      [name]: value,
      photos: name === "roomType" ? roomTypePhotos[value] || [] : prev.photos,
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setRoomData((prev) => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...(prev.amenities || []), amenity],
    }));
  };

  const handleSaveRoom = (e) => {
    e.preventDefault();
    const existingRooms = JSON.parse(localStorage.getItem("rooms")) || [];
    const updatedRooms = existingRooms.map((room) =>
      room.roomNumber === roomNumber ? roomData : room
    );
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    alert("Room updated successfully!");
    navigate("/rooms");
  };

  return (
    <RoomDetailsContainer>
      <RoomDetailsCard>
        <RoomDetailsHeader>
          <h2>Room Details</h2>
        </RoomDetailsHeader>
        <form onSubmit={handleSaveRoom}>
          <RoomDetailsSection>
            <label>Room Type</label>
            <select
              name="roomType"
              value={roomData.roomType || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Double Bed Superior">Double Bed Superior</option>
              <option value="Suite">Suite</option>
            </select>

            <label>Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={roomData.roomNumber || ""}
              onChange={handleInputChange}
              required
            />

            <label>Description</label>
            <textarea
              rows="3"
              name="description"
              value={roomData.description || ""}
              onChange={handleInputChange}
              required
            />

            <label>Offer</label>
            <select
              name="offer"
              value={roomData.offer || "NO"}
              onChange={handleInputChange}
            >
              <option value="NO">NO</option>
              <option value="YES">YES</option>
            </select>

            <label>Price per Night</label>
            <input
              type="number"
              name="rate"
              value={roomData.rate ? roomData.rate.replace("$", "") : ""}
              onChange={handleInputChange}
              required
            />

            <label>Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={roomData.discount || ""}
              onChange={handleInputChange}
              min="0"
              max="100"
            />

            <label>Cancellation Policy</label>
            <textarea
              rows="6"
              name="cancellationPolicy"
              value={roomData.cancellationPolicy || ""}
              onChange={handleInputChange}
              required
            />

            <label>Amenities</label>
            <AmenitiesContainer>
              {amenitiesList.map((amenity, index) => (
                <AmenityItem
                  key={index}
                  onClick={() => handleAmenityToggle(amenity)}
                  $selected={roomData.amenities?.includes(amenity)}
                >
                  {amenity}
                </AmenityItem>
              ))}
            </AmenitiesContainer>
            <ImageUploadSection>
  <label>Room Photos</label>
  <div>
    {roomTypePhotos[roomData.roomType]?.map((photo, index) => (
      <ImagePreview
        key={index}
        src={photo}
        alt={`Room Photo ${index + 1}`}
      />
    )) || (
      <p>No photos available for the selected room type.</p>
    )}
  </div>
</ImageUploadSection>

          </RoomDetailsSection>

          <SaveButton type="submit">Save Changes</SaveButton>
          <BackButton type="button" onClick={() => navigate("/rooms")}>
            Cancel
          </BackButton>
        </form>
      </RoomDetailsCard>
    </RoomDetailsContainer>
  );
};

export { RoomDetails };