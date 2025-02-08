import { createAsyncThunk } from "@reduxjs/toolkit";
import { EditUserPayload, User } from "../../interfaces/users/UsersState.ts";

const USERS_LOCAL_STORAGE_KEY = "usersData";

const simulateApiCall = (data: any, delay = 200) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const fetchAllUsers = createAsyncThunk<User[]>(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      let users = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || "[]");

      if (users.length === 0) {
        const response = await fetch("/data/Users.json"); 
        if (!response.ok) {
          throw new Error("Error loading Users.json");
        }
        users = await response.json();
      }

      const normalizedData = users.map((user: User) => ({
        ...user,
        startDate: user.startDate ? new Date(user.startDate).getTime() : null,
      }));

      localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(normalizedData));

      return normalizedData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk<User, string>(
  "users/fetchUserById",
  async (employeeId, thunkAPI) => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || "[]");
      const user = users.find((u) => u.employeeId === employeeId);

      if (!user) {
        throw new Error(`User with employeeId ${employeeId} not found`);
      }

      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk<User, User>(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      await simulateApiCall(null);
      const existingUsers = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || "[]");
      const newUser: User = {
        ...userData,
        employeeId: crypto.randomUUID(),
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create user");
    }
  }
);

export const deleteUser = createAsyncThunk<string, string>(
  "users/deleteUser",
  async (employeeId, thunkAPI) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || "[]");
      const updatedUsers = existingUsers.filter((user) => user.employeeId !== employeeId);

      localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
      return employeeId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete user");
    }
  }
);

export const editUser = createAsyncThunk<EditUserPayload, EditUserPayload>(
  "users/editUser",
  async (updatedUser, thunkAPI) => {
    try {
      if (!updatedUser.employeeId || !updatedUser.name || !updatedUser.startDate) {
        throw new Error("Invalid user data provided");
      }

      const existingUsers = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || "[]");
      const index = existingUsers.findIndex((user) => user.employeeId === updatedUser.employeeId);

      if (index === -1) {
        throw new Error("User not found");
      }

      existingUsers[index] = updatedUser;
      localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(existingUsers));

      return updatedUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
