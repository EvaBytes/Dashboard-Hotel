import { createAsyncThunk } from "@reduxjs/toolkit";
import { parse, isValid } from "date-fns";

const simulateApiCall = (data, delay = 200) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (usersData, thunkAPI) => {
    try {
      const normalizedData = usersData.map((user) => ({
        ...user,
        startDate: user.startDate
          ? isValid(parse(user.startDate, "dd.MM.yyyy", new Date()))
            ? parse(user.startDate, "dd.MM.yyyy", new Date()).toISOString()
            : null
          : null,
        id: user.employeeId,
      }));
      
      console.log("Normalized Data:", normalizedData); 
      await simulateApiCall(normalizedData);
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
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user) => user.employeeId === employeeId);

      if (!user) {
        return rejectWithValue(`User with employeeId ${employeeId} not found`);
      }

      return user;
    } catch (error) {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      await simulateApiCall();
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const newUser = { ...userData, id: crypto.randomUUID() }; 
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, thunkAPI) => {
    try {
      await simulateApiCall();
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = existingUsers.filter((user) => user.id !== userId);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete user");
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (updatedUser, thunkAPI) => {
    try {
      await simulateApiCall();
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const index = existingUsers.findIndex((user) => user.id === updatedUser.id);
      if (index === -1) return thunkAPI.rejectWithValue("User not found");
      
      existingUsers[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(existingUsers));
      return updatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update user");
    }
  }
);



