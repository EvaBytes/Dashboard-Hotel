import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllUsers, createUser, deleteUser, editUser, fetchUserById } from "../thunks/usersThunks.ts";
import {User, UsersState} from "../../interfaces/users/UsersState.ts"

const initialState: UsersState = {
  users:[],
  filteredUsers: [],
  activeTab: "allEmployees",
  searchText: "",
  loading: false,
  error: null,
  currentUser: null,
};

const filterUsers = (users: User[], activeTab:string, searchText:string): User[] => {
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
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
      state.filteredUsers = filterUsers(state.users, state.activeTab, state.searchText);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload.toLowerCase();
      state.filteredUsers = filterUsers(state.users,state.activeTab, state.searchText);
    },
    setError: (state, action: PayloadAction<string | null> ) => {
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
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users=action.payload;
        state.filteredUsers = filterUsers(state.users, state.activeTab,state.searchText);
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
        state.filteredUsers = filterUsers(state.users,state.activeTab,state.searchText);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.employeeId !== action.payload);
        state.filteredUsers = filterUsers(state.users, state.activeTab, state.searchText);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user.employeeId === action.payload.employeeId);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.filteredUsers = filterUsers(state.users, state.activeTab, state.searchText);
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveTab, setSearchText, setError, clearCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;