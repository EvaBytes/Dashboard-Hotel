import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, createUser, deleteUser, editUser, fetchUserById } from "../thunks/usersThunks.js";

const initialState = {
  users: [],
  filteredUsers: [],
  activeTab: "allEmployees",
  searchText: "",
  loading: false,
  error: null,
  currentUser: null,
};

const filterUsers = (state) => {
  const { users, activeTab, searchText } = state;
  return users.filter((user) => {
    if (activeTab === "activeEmployees" && user.status !== "ACTIVE") return false;
    if (activeTab === "inactiveEmployees" && user.status !== "INACTIVE") return false;
    if (searchText && !user.name.toLowerCase().includes(searchText)) return false;
    return true;
  });
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.filteredUsers = filterUsers(state);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload.toLowerCase();
      state.filteredUsers = filterUsers(state);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = filterUsers(state);
        console.log("Users loaded", state.users);
        console.log("Filtered users:", state.filteredUsers); 

      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.filteredUsers = filterUsers(state);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.filteredUsers = filterUsers(state);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.filteredUsers = filterUsers(state);
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Current User:", action.payload);
      });
  },
});

export const { setActiveTab, setSearchText, setError, clearCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;