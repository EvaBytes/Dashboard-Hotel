import { createAsyncThunk } from '@reduxjs/toolkit';


export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)); 
      const newBooking = {
        ...bookingData,
        id: Date.now(), 
      };
      return newBooking;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (reservationId, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)); 
      return reservationId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBooking = createAsyncThunk(
    'bookings/editBooking',
    async (updatedBookingData, thunkAPI) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 200)); 
        const { id, ...updatedData } = updatedBookingData;
  
        const bookingIndex = thunkAPI.getState().bookings.bookings.findIndex(
          (b) => b.id === id
        );
  
        if (bookingIndex === -1) {
          return thunkAPI.rejectWithValue('Booking not found');
        }
  
        return {
          id,
          ...updatedData,
        };
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (reservationId, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const booking = thunkAPI.getState().bookings.bookings.find(
        (b) => b.guest.reservationNumber === reservationId
      );
      return booking
        ? booking
        : thunkAPI.rejectWithValue('Booking not found');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllBookings = createAsyncThunk(
    'bookings/fetchAllBookings',
    async (_, thunkAPI) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 200)); 
  
        const response = await fetch('src/data/bookings.json'); 
        const data = await response.json();
  
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );



