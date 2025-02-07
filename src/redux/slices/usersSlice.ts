import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllUsers, createUser, deleteUser, editUser, fetchUserById } from "../thunks/usersThunks.ts";
import { EditUserPayload, User, UsersState } from "../../interfaces/users/UsersState.ts";
import { RootState } from "../store.ts";


const initialState: UsersState = {
  status: "idle",
  users: [],
  filteredUsers: [],
  activeTab: "allEmployees",
  searchText: "",
  loading: false,
  error: null,
  currentUser: null,
};

const filterUsers = (users: User[], activeTab: string, searchText: string): User[] => {
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
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload.toLowerCase();
      state.filteredUsers = filterUsers(state.users, state.activeTab, state.searchText);
    },
    setError: (state, action: PayloadAction<string | null>) => {
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
        state.status = "pending";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = filterUsers(state.users, state.activeTab, state.searchText);
        state.status = "fulfilled";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status = "rejected";
      });

    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
        state.filteredUsers = filterUsers(state.users, state.activeTab, state.searchText);
        state.status = "fulfilled";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status = "rejected";
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.employeeId !== action.payload);
        state.filteredUsers = filterUsers(state.users, state.activeTab, state.searchText);
        state.status = "fulfilled";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status = "rejected"; 
      });

    builder
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<EditUserPayload>) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user.employeeId === action.payload.employeeId);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.filteredUsers = filterUsers(state.users, state.activeTab, state.searchText);
        state.status = "fulfilled";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status = "rejected"; 
      });

    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status = "rejected"; 
      });
  },
});


export const selectAllUsers = (state: RootState): User[] => state.users.users;
export const selectUsersStatus = (state: RootState): string => state.users.status;
export const selectCurrentUser = (state: RootState): User | null => state.users.currentUser;
export const selectError = (state: RootState): string | null => state.users.error;
export const selectFilteredUsers = (state: RootState): User[] => state.users.filteredUsers;

export const { setActiveTab, setSearchText, setError, clearCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
