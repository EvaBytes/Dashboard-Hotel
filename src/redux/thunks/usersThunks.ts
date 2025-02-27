import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { EditUserPayload, User } from "../../interfaces/users/UsersState";
import { isValid, parse } from "date-fns";
import { API_URL } from "../../config/index";

export const fetchAllUsers = createAsyncThunk<User[], void, { state: RootState }>(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken"); 

      if (!token) {
        throw new Error("No authentication token found");
      }
      console.log("Headers:", {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
      
      const response = await fetch(`${API_URL}/api/v1/users`, {  
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error fetching users from the server");
      }

      const { data } = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
      }
    }
  }
);

export const fetchUserById = createAsyncThunk<User, string, { state: RootState }>(
  "users/fetchUserById",
  async (employeeId, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken"); 

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/v1/users/${employeeId}`, { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || `User with employeeId ${employeeId} not found`);
      }

      const { data } = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
      }
    }
  }
);

export const createUser = createAsyncThunk<User, User, { state: RootState }>(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken"); 

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/v1/users`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error creating user");
      }

      const { data } = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
      }
    }
  }
);

export const deleteUser = createAsyncThunk<string, string, { state: RootState }>(
  "users/deleteUser",
  async (employeeId, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken"); 

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/${employeeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error deleting user");
      }

      return employeeId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);


export const editUser = createAsyncThunk<EditUserPayload, EditUserPayload, { state: RootState }>(
  "users/editUser",
  async (updatedUser, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken"); 

      if (!token) {
        throw new Error("No authentication token found");
      }

      if (!updatedUser.employeeId || !updatedUser.name || !updatedUser.startDate) {
        throw new Error("Invalid user data provided");
      }

      const parsedDate = parse(updatedUser.startDate, "dd/MM/yyyy", new Date());
      if (!isValid(parsedDate)) {
        throw new Error("Invalid startDate format. Expected format: dd/MM/yyyy");
      }

      const response = await fetch(`${API_URL}/api/v1/users/${updatedUser.employeeId}`, { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error updating user");
      }

      const { data } = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
      }
    }
  }
);
