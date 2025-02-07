import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingById, editBooking } from "../../redux/thunks/bookingsThunks.js";
import { FormContainer, FormGroup, Label, Input, TextArea, SubmitButton, BackButton } from "../../styles/EditBooking.js";

export const EditBooking = () => {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentBooking, loading, error } = useSelector((state) => state.bookings);

  const [fullName, setFullName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [price, setPrice] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  useEffect(() => {
    dispatch(fetchBookingById(reservationId));
  }, [dispatch, reservationId]);

  useEffect(() => {
    if (currentBooking) {
      setFullName(currentBooking.guest?.fullName || "");
      setCheckIn(currentBooking.checkIn?.slice(0, 10) || "");
      setCheckOut(currentBooking.checkOut?.slice(0, 10) || "");
      setPrice(currentBooking.offerPrice || "");
      setSpecialRequest(currentBooking.specialRequest || "");
    }
  }, [currentBooking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      reservationId,
      guest: { ...currentBooking.guest, fullName },
      checkIn,
      checkOut,
      offerPrice: price,
      specialRequest,
    };
    dispatch(editBooking(updatedData))
      .unwrap()
      .then(() => navigate(`/guest/${reservationId}`))
      .catch((err) => console.error("Update Error: ", err));
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <FormContainer>
      <h2>Edit Booking</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="checkIn">Check-In</Label>
            <Input id="checkIn" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="checkOut">Check-Out</Label>
            <Input id="checkOut" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="price">Precio</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="specialRequest">Special Request</Label>
            <TextArea id="specialRequest" rows="3" value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} />
        </FormGroup>
        <SubmitButton type="submit">Guardar</SubmitButton>
        <BackButton onClick={() => navigate(-1)}>Cancelar</BackButton>
      </form>
    </FormContainer>
  );
};
