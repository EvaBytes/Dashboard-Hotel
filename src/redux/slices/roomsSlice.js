import { createSlice } from '@reduxjs/toolkit';
import { fetchRooms, createRoom, deleteRoom, editRoom, fetchRoomById } from "../thunks/roomsThunks.js";

const initialState = {
  rooms: [],
  filteredRooms: [],
  activeTab: "allRooms",
  sortBy: null,
  sortOrder: "asc",
  loading: false,
  error: null,
  currentRoom: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
      state.filteredRooms = filterRooms(state);
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.filteredRooms = filterRooms(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortOrder = "asc";
      }
      state.filteredRooms = sortRooms(state);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
        state.filteredRooms = filterRooms(state);
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload);
        state.filteredRooms = filterRooms(state);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter(room => room.roomNumber !== action.payload);
        state.filteredRooms = filterRooms(state);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editRoom.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rooms.findIndex(room => room.roomNumber === action.payload.roomNumber);
        if (index !== -1) {
          state.rooms[index] = action.payload;
          state.filteredRooms = filterRooms(state);
        }
      })
      .addCase(editRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRoom = action.payload;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

function filterRooms(state) {
  const { rooms, activeTab } = state;
  return rooms.filter(room => {
    if (activeTab === "availableRooms" && room.status !== "Available") return false;
    if (activeTab === "bookedRooms" && room.status !== "Booked") return false;
    return true;
  });
}

function sortRooms(state) {
  const { filteredRooms, sortBy, sortOrder } = state;
  return [...filteredRooms].sort((a, b) => {
    if (!sortBy) return 0;

    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (sortBy === "rate") {
      return sortOrder === "asc" ? parseFloat(valueA) - parseFloat(valueB) : parseFloat(valueB) - parseFloat(valueA);
    }

    if (sortBy === "status") {
      const statusOrder = { Available: 1, Booked: 2, inProgress: 3 };
      return sortOrder === "asc" ? statusOrder[valueA] - statusOrder[valueB] : statusOrder[valueB] - statusOrder[valueA];
    }

    return 0;
  });
}

export const { setRooms, setActiveTab, setSortBy } = roomsSlice.actions;
export default roomsSlice.reducer;