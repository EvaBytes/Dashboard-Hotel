import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Booking, BookingState } from "../../interfaces/bookings/BookingState";

export const createBooking = createAsyncThunk<Booking, Booking, { state: RootState }>(
  "bookings/createBooking",
  async (bookingData, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return bookingData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBooking = createAsyncThunk<string, string, { state: RootState }>(
  "bookings/deleteBooking",
  async (reservationNumber, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return reservationNumber;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBooking = createAsyncThunk<Booking, Booking, { state: RootState }>(
  "bookings/editBooking",
  async (updatedBookingData, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const { reservationNumber, ...updatedFields } = updatedBookingData;
      const { bookings } = thunkAPI.getState().bookings as BookingState;
      const bookingIndex = bookings.findIndex(
        (b: Booking) => b.guest.reservationNumber === reservationNumber
      );

      if (bookingIndex === -1) {
        return thunkAPI.rejectWithValue("Booking not found");
      }

      const existingBooking = bookings[bookingIndex];
      const updatedBooking: Booking = {
        ...existingBooking,
        ...updatedFields,
        guest: {
          ...existingBooking.guest,
          ...updatedFields.guest,
          reservationNumber,
        },
      };
      return updatedBooking;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBookingById = createAsyncThunk<Booking, string, { state: RootState }>(
  "bookings/fetchBookingById",
  async (reservationNumber, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const { bookings } = thunkAPI.getState().bookings as BookingState;
      const booking = bookings.find(
        (b: Booking) => b.guest.reservationNumber === reservationNumber
      );

      if (!booking) {
        return thunkAPI.rejectWithValue("Booking not found");
      }

      return booking;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllBookings = createAsyncThunk<Booking[], void, { state: RootState }>(
  "bookings/fetchAllBookings",
  async (_, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const response = await fetch("/data/bookings.json");
      const data: Booking[] = await response.json();

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);