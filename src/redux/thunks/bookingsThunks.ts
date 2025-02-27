import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { Booking } from "../../interfaces/bookings/BookingState";
import { API_URL } from "../../config/index";


export const createBooking = createAsyncThunk<
  Booking,
  Booking,
  { state: RootState }
>(
  "bookings/createBooking",
  async (bookingData, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to create booking");
      }

      const data: Booking = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteBooking = createAsyncThunk<
  string,
  string,
  { state: RootState }
>(
  "bookings/deleteBooking",
  async (reservationNumber, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/v1/bookings/${reservationNumber}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to delete booking");
      }

      return reservationNumber;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);


export const editBooking = createAsyncThunk<
  Booking,
  Booking,
  { state: RootState }
>(
  "bookings/editBooking",
  async (updatedBookingData, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_URL}/api/v1/bookings/${updatedBookingData.guest.reservationNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedBookingData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to update booking");
      }

      const data: Booking = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchBookingById = createAsyncThunk<
  Booking,
  string,
  { state: RootState }
>(
  "bookings/fetchBookingById",
  async (reservationNumber, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_URL}/api/v1/bookings/${reservationNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Booking not found");
      }

      const data: Booking = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchAllBookings = createAsyncThunk<
  Booking[],
  void,
  { state: RootState }
>(
  "bookings/fetchAllBookings",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Token obtained in fetchAllBookings:", token);
      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Petition requested to: ", `${API_URL}/api/v1/bookings`)
      console.log("Headers: ", {
        Authorization: `Bearer ${token}`,
      })

      const response = await fetch(`${API_URL}/api/v1/bookings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Status reply:", response.status);


      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to fetch bookings");
      }
      const data = await response.json();
      return data.data;      
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);