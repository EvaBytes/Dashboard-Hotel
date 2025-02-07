import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";  
import {NewRoomContainer,RoomInfoCard,RoomHeader,RoomDetailsSection,SaveButton,BackButton,ImageUploadSection,ImagePreview,AmenitiesContainer,AmenityItem} from "../../styles/NewRoomStyles.ts";
import { createRoom } from "../../redux/thunks/roomsThunks.ts";
import { AppDispatch } from "../../redux/store.ts";
import { NewRoomPayload } from "../../interfaces//room/RoomState.ts";

const roomTypePhotos = {
  "Single Bed": ["radoslav-bali-hLdeUT_HE2E-unsplash.jpg","caroline-voelker-KVXxBwIu8Vw-unsplash.jpg","kate-branch-G18uHzrihOE-unsplash.jpg"],
  "Double Bed": ["radoslav-bali-hLdeUT_HE2E-unsplash.jpg","caroline-voelker-KVXxBwIu8Vw-unsplash.jpg","kate-branch-G18uHzrihOE-unsplash.jpg"],
  "Double Superior": ["radoslav-bali-hLdeUT_HE2E-unsplash.jpg","caroline-voelker-KVXxBwIu8Vw-unsplash.jpg","kate-branch-G18uHzrihOE-unsplash.jpg"],
  "Suite": ["radoslav-bali-hLdeUT_HE2E-unsplash.jpg","caroline-voelker-KVXxBwIu8Vw-unsplash.jpg","kate-branch-G18uHzrihOE-unsplash.jpg"],
};

const amenitiesList = ["Air conditioner","High speed WiFi","Breakfast","Kitchen","Cleaning","Shower","Grocery","Single bed","Shop near","Towels","24/7 Online Support","Strong locker","Smart Security","Expert Team"];

const cancellationPolicyText = `
Standard Rate:
The cancellation is free of charge 7 days prior to the date of arrival, after this time we charge you 90% the room rate as cancellation fee, if we could not sell the room more.

Non-Refundable Rate:
For the non refundable bookings are no cancellation or changes possible. In case of a cancellation, 90% of the total amount will be charged as cancellation fee.
`;

const NewRoom = () => {
  const [roomData, setRoomData] = useState<NewRoomPayload>({
    roomPhoto: "",
    roomNumber: "",
    roomType: "",
    facilities: "",
    rate: "",
    offerPrice: "",
    status: "Available",
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
    photos: [],
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [errors, setErrors] = useState({
    roomPhoto: false,
    roomNumber: false,
    roomType: false,
    rate: false,
    offerPrice: false,
    description: false,
    cancellationPolicy: false,
    guestFullName: false,
    guestReservationNumber: false,
    guestImage: false,
    orderDate: false,
    checkIn: false,
    checkOut: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: any) => state.rooms);

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

  const handleSaveRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      roomPhoto: false,
      roomNumber: !roomData.roomNumber.trim(),
      roomType: !roomData.roomType.trim(),
      rate: !roomData.rate,
      offerPrice: false,
      description: !roomData.description.trim(),
      cancellationPolicy: !roomData.cancellationPolicy.trim(),
      guestFullName: false,
      guestReservationNumber: false,
      guestImage: false,
      orderDate: false,
      checkIn: false,
      checkOut: false,
    };

    const hasErrors = Object.values(newErrors).some((value) => value === true);

    if (hasErrors) {
      setErrors(newErrors);
      setErrorMessage("Please fill in all required fields before saving.");
      return;
    }

    setErrors({
      roomPhoto: false,
      roomNumber: false,
      roomType: false,
      rate: false,
      offerPrice: false,
      description: false,
      cancellationPolicy: false,
      guestFullName: false,
      guestReservationNumber: false,
      guestImage: false,
      orderDate: false,
      checkIn: false,
      checkOut: false,
    });
    setErrorMessage("");

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
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSaveRoom}>
          <RoomDetailsSection>
            <label>Room Type</label>
            <select
              name="roomType"
              value={roomData.roomType}
              onChange={handleInputChange}
              style={{ border: errors.roomType ? "1px solid red" : undefined }}
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
              style={{
                border: errors.roomNumber ? "1px solid red" : undefined,
              }}
            />

            <label>Description</label>
            <textarea
              rows={3}
              name="description"
              value={roomData.description}
              onChange={handleInputChange}
              style={{
                border: errors.description ? "1px solid red" : undefined,
              }}
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
              value={roomData.rate}
              onChange={handleInputChange}
              style={{
                border: errors.rate ? "1px solid red" : undefined,
              }}
            />

            <label>Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={roomData.discount}
              onChange={handleInputChange}
              min="0"
              max="100"
            />

            <label>Cancellation Policy</label>
            <textarea rows={6} name="cancellationPolicy" value={roomData.cancellationPolicy} onChange={handleInputChange} style={{border: errors.cancellationPolicy ? "1px solid red" : undefined}}/>

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
                {roomData.photos?.map((photo, index) => (
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
