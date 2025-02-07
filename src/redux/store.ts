import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from './slices/bookingsSlice.ts';
import roomsReducer from './slices/roomsSlice.ts';
import contactReducer from './slices/contactSlice.ts'
import usersReducer from './slices/usersSlice.ts'; 

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    rooms: roomsReducer,
    contact: contactReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;