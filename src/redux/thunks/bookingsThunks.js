import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return bookingData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (reservationNumber, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return reservationNumber;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBooking = createAsyncThunk(
  "bookings/editBooking",
  async (updatedBookingData, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const { reservationNumber, ...updatedFields } = updatedBookingData;
      const { bookings } = thunkAPI.getState().bookings;
      const bookingIndex = bookings.findIndex(
        (b) => b.guest.reservationNumber === reservationNumber
      );

      if (bookingIndex === -1) {
        return thunkAPI.rejectWithValue("Booking not found");
      }

      const existingBooking = bookings[bookingIndex];
      const updatedBooking = {
        ...existingBooking,
        ...updatedFields, 
        guest: {
          ...existingBooking.guest,
          ...updatedFields.guest, 
          reservationNumber,       
        },
      };
      return updatedBooking;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  "bookings/fetchBookingById",
  async (reservationNumber, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const { bookings } = thunkAPI.getState().bookings;
      const booking = bookings.find(
        (b) => b.guest.reservationNumber === reservationNumber
      );

      if (!booking) {
        return thunkAPI.rejectWithValue("Booking not found");
      }

      return booking;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchAllBookings = createAsyncThunk(
  "bookings/fetchAllBookings",
  async (_, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const response = await fetch("src/data/bookings.json");
      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
