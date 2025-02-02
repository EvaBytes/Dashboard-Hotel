import { createSlice } from "@reduxjs/toolkit";
import {createBooking,deleteBooking,editBooking,fetchBookingById,fetchAllBookings} from "../thunks/bookingsThunks.js";

const initialState = {
  bookings: [],
  filteredBookings: [],
  activeTab: "allBookings",
  searchText: "",
  sortBy: null,
  sortOrder: "asc",
  currentPage: 1,
  itemsPerPage: 10,
  loading: false,
  error: null,
  currentBooking: null,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
      state.filteredBookings = filterBookings(state);
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.filteredBookings = filterBookings(state);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload.toLowerCase();
      state.filteredBookings = filterBookings(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortOrder = "asc";
      }
      state.filteredBookings = sortBookings(state);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.filteredBookings = filterBookings(state);
        localStorage.setItem("bookings", JSON.stringify(state.bookings));
      })
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        const reservationNumberToDelete = action.payload;
        state.bookings = state.bookings.filter(
          (booking) => booking.guest.reservationNumber !== reservationNumberToDelete
        );
        state.filteredBookings = filterBookings(state);
        localStorage.setItem("bookings", JSON.stringify(state.bookings));
      })
      .addCase(editBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBooking.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBooking = action.payload;
        const { reservationNumber } = updatedBooking.guest;
        const index = state.bookings.findIndex(
          (b) => b.guest.reservationNumber === reservationNumber
        );
        if (index !== -1) {
          state.bookings[index] = updatedBooking;
        }
        state.filteredBookings = filterBookings(state);
        localStorage.setItem("bookings", JSON.stringify(state.bookings));
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.filteredBookings = filterBookings(state);
        localStorage.setItem("bookings", JSON.stringify(state.bookings));
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

function filterBookings(state) {
  const { bookings, activeTab, searchText } = state;
  return bookings.filter((booking) => {
    if (activeTab === "checkIn" && booking.status !== "Check-In") return false;
    if (activeTab === "checkOut" && booking.status !== "Check-Out") return false;
    if (activeTab === "inProgress" && booking.status !== "In Progress") return false;

    if (searchText && booking.guest?.fullName) {
      return booking.guest.fullName.toLowerCase().includes(searchText);
    }

    return true;
  });
}

function sortBookings(state) {
  const { filteredBookings, sortBy, sortOrder } = state;
  if (!sortBy) return [...filteredBookings];

  return [...filteredBookings].sort((a, b) => {
    let valueA, valueB;
    if (sortBy === "orderDate" || sortBy === "checkIn" || sortBy === "checkOut") {
      valueA = new Date(a[sortBy]);
      valueB = new Date(b[sortBy]);
    } else if (sortBy === "guest.fullName") {
      valueA = a.guest.fullName.toLowerCase();
      valueB = b.guest.fullName.toLowerCase();
    } else {
      valueA = a[sortBy];
      valueB = b[sortBy];
    }

    if (valueA === valueB) return 0;
    if (sortOrder === "asc") return valueA < valueB ? -1 : 1;
    return valueA > valueB ? -1 : 1;
  });
}

export const {setBookings,setActiveTab,setSearchText,setSortBy,setCurrentPage,setError} = bookingsSlice.actions;
export {createBooking,deleteBooking,editBooking,fetchBookingById,fetchAllBookings} from "../thunks/bookingsThunks";
export default bookingsSlice.reducer;
