import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRooms, createRoom, deleteRoom, editRoom, fetchRoomById } from "../thunks/roomsThunks.ts";
import { Room, RoomState } from "../../interfaces/room/RoomState.ts";
import { RootState } from "../../redux/store.ts";

const initialState: RoomState = {
  rooms: [],
  filteredRooms: [],
  activeTab: "allRooms",
  sortBy: null,
  sortOrder: "asc",
  loading: "idle",
  error: null,
  currentRoom: null,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
      state.filteredRooms = filterRooms(state);
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
      state.filteredRooms = filterRooms(state);
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortOrder = "asc";
      }
      state.filteredRooms = sortRooms(state);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.loading = 'fulfilled';
        state.rooms = action.payload;
        state.filteredRooms = filterRooms(state);
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch rooms';
      })
      .addCase(createRoom.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.loading = 'fulfilled';
        state.rooms.push(action.payload);
        state.filteredRooms = filterRooms(state);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to create room';
      })
      .addCase(deleteRoom.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = 'fulfilled';
        state.rooms = state.rooms.filter(room => room.roomNumber !== action.payload);
        state.filteredRooms = filterRooms(state);
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to delete room';
      })
      .addCase(editRoom.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(editRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.loading = 'fulfilled';
        const index = state.rooms.findIndex(room => room.roomNumber === action.payload.roomNumber);
        if (index !== -1) {
          state.rooms[index] = action.payload;
          state.filteredRooms = filterRooms(state);
        }
      })
      .addCase(editRoom.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update room';
      })
      .addCase(fetchRoomById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchRoomById.fulfilled, (state, action: PayloadAction<Room>) => {
        state.loading = 'fulfilled';
        state.currentRoom = action.payload;
      })
      .addCase(fetchRoomById.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch room by ID';
      });
  },
});

function filterRooms(state: RoomState): Room[] {
  const { rooms, activeTab } = state;
  return rooms.filter(room => {
    if (activeTab === "availableRooms" && room.status !== "Available") return false;
    if (activeTab === "bookedRooms" && room.status !== "Booked") return false;
    return true;
  });
}

function sortRooms(state: RoomState): Room[] {
  const { filteredRooms, sortBy, sortOrder } = state;
  return [...filteredRooms].sort((a, b) => {
    if (!sortBy) return 0;

    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (sortBy === "rate") {
      return sortOrder === "asc" ? parseFloat(valueA) - parseFloat(valueB) : parseFloat(valueB) - parseFloat(valueA);
    }

    if (sortBy === "status") {
      const statusOrder = { Available: 1, Booked: 2, "In Progress": 3 };
      return sortOrder === "asc" ? statusOrder[valueA] - statusOrder[valueB] : statusOrder[valueB] - statusOrder[valueA];
    }

    return 0;
  });
}

export const { setRooms, setActiveTab, setSortBy, setError } = roomsSlice.actions;

export const selectRoomsState = (state: RootState): RoomState => state.rooms;

export const selectRooms = (state: RootState): Room[] => state.rooms.rooms;
export const selectFilteredRooms = (state: RootState): Room[] => state.rooms.filteredRooms;
export const selectActiveTab = (state: RootState): string => state.rooms.activeTab;
export const selectSortBy = (state: RootState): string | null => state.rooms.sortBy;
export const selectSortOrder = (state: RootState): "asc" | "desc" => state.rooms.sortOrder;
export const selectLoading = (state: RootState): "idle" | "pending" | "fulfilled" | "rejected" => state.rooms.loading;
export const selectError = (state: RootState): string | null => state.rooms.error;
export const selectCurrentRoom = (state: RootState): Room | null => state.rooms.currentRoom;

export default roomsSlice.reducer;