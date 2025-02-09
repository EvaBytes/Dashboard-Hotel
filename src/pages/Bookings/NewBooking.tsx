import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createBooking } from "../../redux/thunks/bookingsThunks";
import { FormContainer, FormGroup, Label, Input, TextArea, SubmitButton, BackButton } from "../../styles/NewBookingStyles";
import { AppDispatch } from "../../redux/store";

const NewBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    fullName: false,
    reservationId: false,
    checkIn: false,
    checkOut: false,
    roomNumber: false,
    price: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      fullName: !formData.fullName.trim(),
      reservationId: !formData.reservationId.trim(),
      checkIn: !formData.checkIn.trim(),
      checkOut: !formData.checkOut.trim(),
      roomNumber: !formData.roomNumber.trim(),
      price: !formData.price,
    };

    const hasErrors = Object.values(newErrors).some((val) => val === true);

    if (hasErrors) {
      setErrors(newErrors);
      setErrorMessage("Please fill in all required fields before submitting.");
      return;
    }

    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      Swal.fire("Error", "Check-out date must be after check-in date.", "error");
      return;
    }

    setErrors({
      fullName: false,
      reservationId: false,
      checkIn: false,
      checkOut: false,
      roomNumber: false,
      price: false,
    });
    setErrorMessage("");

    setIsLoading(true);

    const formattedData = {
      guest: {
        fullName: formData.fullName,
        reservationNumber: formData.reservationId,
        image: "/Profile2.png", 
      },
      orderDate: new Date().toISOString(),
      checkIn: new Date(formData.checkIn).toISOString(),
      checkOut: new Date(formData.checkOut).toISOString(),
      roomType: formData.roomNumber, 
      specialRequest: formData.specialRequest,
      facilities: formData.amenities,
      status: "In Progress", 
      roomPhoto: [],
      offerPrice: formData.price,
    };

    dispatch(createBooking(formattedData))
      .then((result) => {
        if (createBooking.fulfilled.match(result)) {
          Swal.fire("Success", "New booking added successfully!", "success");
          navigate("/bookings");
        } else {
          Swal.fire("Error", result.error?.message || "Failed to create booking", "error");
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.message || "Failed to create booking", "error");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <FormContainer>
      <h2>New Booking</h2>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ border: errors.fullName ? "1px solid red" : undefined }}/>
        </FormGroup>

        <FormGroup>
          <Label>Reservation ID</Label>
          <Input type="text" name="reservationId" value={formData.reservationId} onChange={handleChange}style={{border: errors.reservationId ? "1px solid red" : undefined}}/>
        </FormGroup>

        <FormGroup>
          <Label>Check-In</Label>
          <Input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} style={{ border: errors.checkIn ? "1px solid red" : undefined }}/>
        </FormGroup>

        <FormGroup>
          <Label>Check-Out</Label>
          <Input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange}style={{ border: errors.checkOut ? "1px solid red" : undefined }}/>
        </FormGroup>

        <FormGroup>
          <Label>Room Number</Label>
          <Input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange}style={{ border: errors.roomNumber ? "1px solid red" : undefined }}/>
        </FormGroup>

        <FormGroup>
          <Label>Price</Label>
          <Input type="number" name="price" value={formData.price} onChange={handleChange} style={{ border: errors.price ? "1px solid red" : undefined }}/>
        </FormGroup>

        <FormGroup>
          <Label>Special Request</Label>
          <TextArea name="specialRequest" value={formData.specialRequest} onChange={handleChange}/>
        </FormGroup>

        <FormGroup>
          <Label>Amenities</Label>
          <Input type="text" name="amenities" value={formData.amenities}onChange={handleChange}placeholder="E.g., WiFi, Pool, Gym"/>
        </FormGroup>

        <div style={{ display: "flex", gap: "1rem" }}>
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </SubmitButton>
          <BackButton type="button" onClick={() => navigate("/bookings")}>
            Cancel
          </BackButton>
        </div>
      </form>
    </FormContainer>
  );
};

export { NewBooking };