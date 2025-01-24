import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import {bookingsSlice} from '../redux/slices/bookingsSlice.js';

export const store = configureStore({
  reducer: {
    bookings: bookingsSlice.reducer,
  },

middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk),
});
