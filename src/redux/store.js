import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from '../redux/slices/bookingsSlice.js';
import roomsReducer from '../redux/slices/roomsSlice.js';
import usersReducer from '../redux/slices/usersSlice.js'; 

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    rooms: roomsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});