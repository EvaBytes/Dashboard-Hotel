import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from '../redux/slices/bookingsSlice.js';
import roomsReducer from '../redux/slices/roomsSlice.js';
import contactReducer from '../redux/slices/contactSlice.js'
import usersReducer from '../redux/slices/usersSlice.js'; 

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    rooms: roomsReducer,
    contact: contactReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});