import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBooking, deleteBooking, editBooking, fetchBookingById, fetchAllBookings } from "../thunks/bookingsThunks";
import { BookingState, Booking } from "../../interfaces/bookings/BookingState";
import { RootState } from "../store";

const initialState: BookingState = {
  bookings: [],
  filteredBookings: [],
  activeTab: "allBookings",
  searchText: "",
  sortBy: null,
  sortOrder: "asc",
  currentPage: 1,
  itemsPerPage: 10,
  loading: "idle",
  error: null,
  currentBooking: null,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
      state.filteredBookings = filterBookings(state);
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
      state.sortBy = null; 
      state.sortOrder = "asc"; 
      state.filteredBookings = filterBookings(state); 
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload.toLowerCase();
      state.filteredBookings = filterBookings(state);
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = action.payload;
        state.sortOrder = "desc";
      }
      state.filteredBookings = sortBookings(state); 
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload;
      state.filteredBookings = sortBookings(state); 
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = "idle";
        state.bookings.push(action.payload);
        state.filteredBookings = filterBookings(state);
        localStorage.setItem("bookings", JSON.stringify(state.bookings));
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = "idle";
        state.error = typeof action.payload === 'string' ? action.payload : "Failed to create booking.";
      })
      .addCase(deleteBooking.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = "idle";
        const reservationNumberToDelete = action.payload;
        state.bookings = state.bookings.filter(
          (booking) => booking.guest.reservationNumber !== reservationNumberToDelete
        );
        state.filteredBookings = filterBookings(state);
        localStorage.setItem("bookings", JSON.stringify(state.bookings));
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = "idle";
        state.error = typeof action.payload === 'string' ? action.payload : "Failed to delete booking.";
      })
      .addCase(editBooking.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(editBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = "idle";
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
      .addCase(editBooking.rejected, (state, action) => {
        state.loading = "idle";
        state.error = typeof action.payload === 'string' ? action.payload : "Failed to edit booking.";
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = "idle";
        state.currentBooking = action.payload;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = "idle";
        state.error = typeof action.payload === 'string' ? action.payload : "Failed to fetch booking by ID.";
      })
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = "idle";
        state.bookings = action.payload;
        state.filteredBookings = filterBookings(state);
        localStorage.setItem("bookings", JSON.stringify(state.bookings));
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = "idle";
        state.error = typeof action.payload === 'string' ? action.payload : "Failed to fetch bookings.";
      });
  },
});

function filterBookings(state: BookingState): Booking[] {
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

function sortBookings(state: BookingState): Booking[] {
  const { filteredBookings, sortBy, sortOrder } = state;
  if (!sortBy) return [...filteredBookings];

  return [...filteredBookings].sort((a, b) => {
    let valueA: any, valueB: any;

    if (sortBy === "orderDate" || sortBy === "checkIn" || sortBy === "checkOut") {
      valueA = new Date(a[sortBy]);
      valueB = new Date(b[sortBy]);
      if (isNaN(valueA.getTime())) valueA = new Date(0); 
      if (isNaN(valueB.getTime())) valueB = new Date(0); 
    }
    else if (sortBy === "guest.fullName") {
      valueA = a.guest?.fullName?.toLowerCase() || "";
      valueB = b.guest?.fullName?.toLowerCase() || "";
    }
    else {
      valueA = a[sortBy];
      valueB = b[sortBy];
    }

    if (valueA === valueB) return 0;
    if (sortOrder === "asc") return valueA < valueB ? -1 : 1;
    return valueA > valueB ? -1 : 1;
  });
}

export const { setBookings, setActiveTab, setSearchText, setSortBy, setSortOrder, setCurrentPage, setError } = bookingsSlice.actions;

export const selectBookingsState = (state: RootState): BookingState => state.bookings;
export const selectBookings = (state: RootState): Booking[] => state.bookings.bookings;
export const selectFilteredBookings = (state: RootState): Booking[] => state.bookings.filteredBookings;
export const selectActiveTab = (state: RootState): string => state.bookings.activeTab;
export const selectSortBy = (state: RootState): string | null => state.bookings.sortBy;
export const selectSortOrder = (state: RootState): "asc" | "desc" => state.bookings.sortOrder;
export const selectLoading = (state: RootState): "idle" | "pending" | "fulfilled" | "rejected" => state.bookings.loading;
export const selectError = (state: RootState): string | null => state.bookings.error;
export const selectCurrentBooking = (state: RootState): Booking | null => state.bookings.currentBooking;

export default bookingsSlice.reducer;