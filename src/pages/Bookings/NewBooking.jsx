import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBooking } from "../../redux/thunks/bookingsThunks.js"; 
import {FormContainer,FormGroup,Label,Input,TextArea,SubmitButton,BackButton} from "../../styles/NewBookingStyles.js";

const NewBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    reservationId: "",
    checkIn: "",
    checkOut: "",
    roomNumber: "",
    price: "",
    specialRequest: "",
    amenities: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking(formData)) 
      .unwrap()
      .then(() => {
        alert("New booking added successfully!");
        navigate("/bookings");
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  };

  return (
    <FormContainer>
      <h2>New Booking</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Reservation ID</Label>
          <Input
            type="text"
            name="reservationId"
            value={formData.reservationId}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Check-In</Label>
          <Input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Check-Out</Label>
          <Input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Room Number</Label>
          <Input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Special Request</Label>
          <TextArea
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Amenities</Label>
          <Input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            placeholder="E.g., WiFi, Pool, Gym"
          />
        </FormGroup>
        <div style={{ display: "flex", gap: "1rem" }}>
          <SubmitButton type="submit">Submit</SubmitButton>
          <BackButton type="button" onClick={() => navigate("/bookings")}>
            Cancel
          </BackButton>
        </div>
      </form>
    </FormContainer>
  );
};

export { NewBooking };
