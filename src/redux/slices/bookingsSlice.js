import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// THUNKS
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

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (reservationId, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const booking = thunkAPI.getState().bookings.bookings.find(
        (b) => b.guest.reservationNumber === reservationId
      );
      if (!booking) {
        throw new Error('Booking not found');
      }
      return booking;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  bookings: [],
  filteredBookings: [],
  activeTab: 'allBookings',
  searchText: '',
  sortBy: null,
  sortOrder: 'asc',
  currentPage: 1,
  itemsPerPage: 10,
  loading: false,
  error: null,
  currentBooking: null,
};



// SLICES
const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
      state.filteredBookings = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.filteredBookings = filterBookingsByTab(state);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload.toLowerCase();
      state.filteredBookings = filterBookingsBySearch(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortOrder = 'asc';
      }
      state.filteredBookings = sortBookings(state);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
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
        state.filteredBookings = filterBookingsByTab(state);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(
          (booking) => booking.guest.reservationNumber !== action.payload
        );
        state.filteredBookings = state.filteredBookings.filter(
          (booking) => booking.guest.reservationNumber !== action.payload
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      });
  },
});

function filterBookingsByTab(state) {
  const { bookings, activeTab } = state;
  return bookings.filter((booking) => {
    if (activeTab === 'checkIn') return booking.status === 'Check-In';
    if (activeTab === 'checkOut') return booking.status === 'Check-Out';
    if (activeTab === 'inProgress') return booking.status === 'In Progress';
    return true;
  });
}

function filterBookingsBySearch(state) {
  const { filteredBookings, searchText } = state;
  return filteredBookings.filter((booking) =>
    booking.guest.fullName.toLowerCase().includes(searchText)
  );
}

function sortBookings(state) {
  const { filteredBookings, sortBy, sortOrder } = state;
  return [...filteredBookings].sort((a, b) => {
    if (!sortBy) return 0;
    const valueA = new Date(a[sortBy]);
    const valueB = new Date(b[sortBy]);
    if (sortOrder === 'asc') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
}

export const { setBookings, setActiveTab, setSearchText, setSortBy, setCurrentPage } =
  bookingsSlice.actions;
export { bookingsSlice };