import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {NewRoomContainer,RoomInfoCard,RoomHeader,RoomDetailsSection,SaveButton,BackButton,ImageUploadSection,ImagePreview,AmenitiesContainer,AmenityItem} from "../../styles/NewRoomStyles.js";
import { createRoom} from "../../redux/thunks/roomsThunks.js";

const roomTypePhotos = {
  "Single Bed": ["radoslav-bali-hLdeUT_HE2E-unsplash.jpg", "caroline-voelker-KVXxBwIu8Vw-unsplash.jpg", "kate-branch-G18uHzrihOE-unsplash.jpg"],
  "Double Bed": ["radoslav-bali-hLdeUT_HE2E-unsplash.jpg", "caroline-voelker-KVXxBwIu8Vw-unsplash.jpg", "kate-branch-G18uHzrihOE-unsplash.jpg"],
  "Double Superior": ["radoslav-bali-hLdeUT_HE2E-unsplash.jpg", "caroline-voelker-KVXxBwIu8Vw-unsplash.jpg", "kate-branch-G18uHzrihOE-unsplash.jpg"],
  "Suite": ["radoslav-bali-hLdeUT_HE2E-unsplash.jpg", "caroline-voelker-KVXxBwIu8Vw-unsplash.jpg", "kate-branch-G18uHzrihOE-unsplash.jpg"],
};

const amenitiesList = ["Air conditioner","High speed WiFi","Breakfast","Kitchen","Cleaning","Shower","Grocery","Single bed","Shop near","Towels","24/7 Online Support","Strong locker","Smart Security","Expert Team"];

const cancellationPolicyText = `
Standard Rate:
The cancellation is free of charge 7 days prior to the date of arrival, after this time we charge you 90% the room rate as cancellation fee, if we could not sell the room more.

Non-Refundable Rate:
For the non refundable bookings are no cancellation or changes possible. In case of a cancellation, 90% of the total amount will be charged as cancellation fee.

`;

const NewRoom = () => {
  const [roomData, setRoomData] = useState({
    photos: [],
    roomType: "",
    roomNumber: "",
    description: "",
    offer: "NO",
    price: "",
    discount: "",
    cancellationPolicy: cancellationPolicyText,
    amenities: [],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.rooms); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));

    if (name === "roomType" && roomTypePhotos[value]) {
      setRoomData((prev) => ({
        ...prev,
        photos: roomTypePhotos[value],
      }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setRoomData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSaveRoom = (e) => {
    e.preventDefault();

    if (!roomData.roomNumber || !roomData.roomType || !roomData.price) {
      Swal.fire("Error", "Please fill in all required fields.", "error");
      return;
    }

    dispatch(createRoom(roomData))
      .unwrap() 
      .then(() => {
        Swal.fire("Success", "Room created successfully!", "success");
        navigate("/rooms"); 
      })
      .catch((error) => {
        Swal.fire("Error", error || "Failed to create room.", "error");
      });
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
              value={roomData.offer}
              onChange={handleInputChange}
            >
              <option value="NO">NO</option>
              <option value="YES">YES</option>
            </select>

            <label>Price per Night</label>
            <input
              type="number"
              name="price"
              value={roomData.price || ""}
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
              value={roomData.cancellationPolicy}
              onChange={handleInputChange}
              required
            />

            <label>Amenities</label>
            <AmenitiesContainer>
              {amenitiesList.map((amenity) => (
                <AmenityItem
                  key={amenity}
                  onClick={() => handleAmenityToggle(amenity)}
                  $selected={roomData.amenities.includes(amenity)}
                >
                  {amenity}
                </AmenityItem>
              ))}
            </AmenitiesContainer>

            <ImageUploadSection>
              <label>Room Photos</label>
              <div>
                {roomData.photos.map((photo, index) => (
                  <ImagePreview
                    key={index}
                    src={photo}
                    alt={`Room Photo ${index + 1}`}
                  />
                ))}
              </div>
            </ImageUploadSection>
          </RoomDetailsSection>

          <SaveButton type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Room"}
          </SaveButton>
          <BackButton type="button" onClick={() => navigate("/rooms")}>
            Cancel
          </BackButton>
        </form>
      </RoomInfoCard>
    </NewRoomContainer>
  );
};

export { NewRoom };