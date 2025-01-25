import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from '../redux/slices/bookingsSlice'; 

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});