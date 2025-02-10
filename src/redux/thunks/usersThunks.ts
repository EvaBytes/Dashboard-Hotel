import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { EditUserPayload, User } from "../../interfaces/users/UsersState";
import { isValid, parse } from "date-fns";

const simulateRequest = async <T>(data: T, delay: number = 400): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

export const fetchAllUsers = createAsyncThunk<User[], void, { state: RootState }>(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/data/Users.json");
      if (!response.ok) {
        throw new Error("Error loading Users.json");
      }
      const users: User[] = await response.json();
      const normalizedData = users.map((user: User) => ({
        ...user,
        startDate: user.startDate || null,
      }));

      return normalizedData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchUserById = createAsyncThunk<User, string, { state: RootState }>(
  "users/fetchUserById",
  async (employeeId, thunkAPI) => {
    try {
      const { users } = thunkAPI.getState().users;
      const user = users.find((u) => u.employeeId === employeeId);

      if (!user) {
        throw new Error(`User with employeeId ${employeeId} not found`);
      }

      const responseUser = await simulateRequest(user);
      return responseUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const createUser = createAsyncThunk<User, User, { state: RootState }>(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      const newUser: User = {
        ...userData,
        employeeId: crypto.randomUUID(),
      };

      const responseUser = await simulateRequest(newUser);
      return responseUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteUser = createAsyncThunk<string, string, { state: RootState }>(
  "users/deleteUser",
  async (employeeId, thunkAPI) => {
    try {
      await simulateRequest(null);
      return employeeId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const editUser = createAsyncThunk<EditUserPayload, EditUserPayload, { state: RootState }>(
  "users/editUser",
  async (updatedUser, thunkAPI) => {
    try {
      if (!updatedUser.employeeId || !updatedUser.name || !updatedUser.startDate) {
        throw new Error("Invalid user data provided");
      }

      const parsedDate = parse(updatedUser.startDate, "dd/MM/yyyy", new Date());
      if (!isValid(parsedDate)) {
        throw new Error("Invalid startDate format. Expected format: dd/MM/yyyy");
      }

      const responseUser = await simulateRequest(updatedUser);
      return responseUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);