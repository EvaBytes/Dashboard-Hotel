import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (usersData, thunkAPI) => { 
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)); 
      return usersData; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)); 
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const newUser = { ...userData, id: Date.now() }; 
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); 
      return newUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)); 
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = existingUsers.filter((user) => user.id !== userId); 
      localStorage.setItem("users", JSON.stringify(updatedUsers)); 
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const editUser = createAsyncThunk(
  "users/editUser",
  async (updatedUser, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200)); 
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const index = existingUsers.findIndex((user) => user.id === updatedUser.id); 
      if (index !== -1) {
        existingUsers[index] = updatedUser; 
        localStorage.setItem("users", JSON.stringify(existingUsers)); 
      }
      return updatedUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (employeeId, { rejectWithValue }) => {
    try {
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      const user = employees.find((emp) => emp.employeeId === employeeId);

      if (!user) {
        return rejectWithValue("User not found"); 
      }

      return user; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);