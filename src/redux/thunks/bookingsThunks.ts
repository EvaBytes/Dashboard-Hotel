import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Booking } from "../../interfaces/bookings/BookingState";

const simulateRequest = async <T>(data: T, delay: number = 400): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

export const createBooking = createAsyncThunk<Booking, Booking, { state: RootState }>(
  "bookings/createBooking",
  async (bookingData, thunkAPI) => {
    try {
      const response = await simulateRequest(bookingData);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteBooking = createAsyncThunk<string, string, { state: RootState }>(
  "bookings/deleteBooking",
  async (reservationNumber, thunkAPI) => {
    try {
      await simulateRequest(null);
      return reservationNumber;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const editBooking = createAsyncThunk<Booking, Booking, { state: RootState }>(
  "bookings/editBooking",
  async (updatedBookingData, thunkAPI) => {
    try {
      const response = await simulateRequest(updatedBookingData);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchBookingById = createAsyncThunk<Booking, string, { state: RootState }>(
  "bookings/fetchBookingById",
  async (reservationNumber, thunkAPI) => {
    try {
      const { bookings } = thunkAPI.getState().bookings;
      const booking = bookings.find(
        (b) => b.guest.reservationNumber === reservationNumber
      );

      if (!booking) {
        throw new Error("Booking not found");
      }

      const response = await simulateRequest(booking);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchAllBookings = createAsyncThunk<Booking[], void, { state: RootState }>(
  "bookings/fetchAllBookings",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/data/Bookings.json");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data: Booking[] = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);