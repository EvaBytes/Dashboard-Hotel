import { createAsyncThunk } from "@reduxjs/toolkit";
import { parse, isValid } from "date-fns";

const USERS_LOCAL_STORAGE_KEY = "users";

const simulateApiCall = (data, delay = 200) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (usersData, thunkAPI) => {
    try {
      const normalizedData = usersData.map((user) => {
        let parsedDate = null;
        if (user.startDate) {
          if (typeof user.startDate === "string" && !isNaN(new Date(user.startDate))) {
            parsedDate = new Date(user.startDate).toISOString();
          } else {
            parsedDate = isValid(parse(user.startDate, "dd.MM.yyyy", new Date()))
              ? parse(user.startDate, "dd.MM.yyyy", new Date()).toISOString()
              : null;
          }
        }
        return {
          ...user,
          startDate: parsedDate,
        };
      });

      console.log("Normalized Data:", normalizedData);
      localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(normalizedData));
      return normalizedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (employeeId, { rejectWithValue }) => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY)) || [];
      const user = users.find((user) => user.employeeId === employeeId);

      if (!user) {
        return rejectWithValue(`User with employeeId ${employeeId} not found in localStorage`);
      }
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      await simulateApiCall();
      const existingUsers = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY)) || [];
      const newUser = {
        ...userData,
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      };
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (employeeId, thunkAPI) => {
    try {
      await simulateApiCall();
      const existingUsers = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY)) || [];
      const updatedUsers = existingUsers.filter((user) => user.employeeId !== employeeId);
      localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
      return employeeId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete user");
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (updatedUser, thunkAPI) => {
    try {
      if (!updatedUser.id || !updatedUser.name || !updatedUser.startDate) {
        return thunkAPI.rejectWithValue("Invalid user data provided");
      }

      await simulateApiCall();
      const existingUsers = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY)) || [];
      const index = existingUsers.findIndex((user) => user.id === updatedUser.id);
      if (index === -1) return thunkAPI.rejectWithValue("User not found");

      existingUsers[index] = updatedUser;
      localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(existingUsers));
      return updatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update user");
    }
  }
);