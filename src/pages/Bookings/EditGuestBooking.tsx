import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingById, editBooking } from "../../redux/thunks/bookingsThunks.ts";
import { FormContainer, FormGroup, Label, Input, TextArea, SubmitButton, BackButton } from "../../styles/EditBooking.ts";
import { RootState, AppDispatch } from "../../redux/store.ts";
import { Booking } from "../../interfaces/bookings/BookingState.ts";

export const EditBooking = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentBooking, loading, error } = useSelector((state: RootState) => state.bookings);

  const [fullName, setFullName] = useState<string>("");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [specialRequest, setSpecialRequest] = useState<string>("");

  useEffect(() => {
    if (reservationId) {
      dispatch(fetchBookingById(reservationId));
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationId || !currentBooking) return;

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

  if (loading === "pending") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <FormContainer>
      <h2>Edit Booking</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
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
          <Label htmlFor="price">Price</Label>
          <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="specialRequest">Special Request</Label>
          <TextArea id="specialRequest" rows={3} value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} />
        </FormGroup>
        <SubmitButton type="submit">Save</SubmitButton>
        <BackButton onClick={() => navigate(-1)}>Cancel</BackButton>
      </form>
    </FormContainer>
  );
};