import { createAsyncThunk } from "@reduxjs/toolkit";
import { parse, isValid } from "date-fns";
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
        users = await new Promise((resolve, reject) => {
          fetch("/Users.json")
            .then((response) => {
              if (!response.ok) reject(new Error("Error al cargar Users.json"));
              return response.json();
            })
            .then((data) => resolve(data))
            .catch((error) => reject(error));
        });
      }

      const normalizedData = users.map((user: User) => {
        let parsedDate: number | null = null;
        if (user.startDate) {
          if (typeof user.startDate === "string" && !isNaN(Date.parse(user.startDate))) {
            parsedDate = new Date(user.startDate).getTime();
          } else {
            const parsed = parse(user.startDate as string, "dd.MM.yyyy", new Date());
            parsedDate = isValid(parsed) ? parsed.getTime() : null;
          }
        }
        return {
          ...user,
          startDate: parsedDate,
        };
      });

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
    return new Promise<User>((resolve, reject) => {
      try {
        const users: User[] = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || "[]");
        const user = users.find((u) => u.employeeId === employeeId);

        if (!user) {
          reject(`User with employeeId ${employeeId} not found in localStorage`);
        } else {
          resolve(user);
        }
      } catch (error) {
        reject("Failed to fetch user data");
      }
    }).catch((error) => thunkAPI.rejectWithValue(error));
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
        employeeId: crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2, 9),
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
    return new Promise<string>((resolve, reject) => {
      try {
        const existingUsers = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || "[]");
        const updatedUsers = existingUsers.filter((user) => user.employeeId !== employeeId);

        localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));
        resolve(employeeId);
      } catch (error) {
        reject("Failed to delete user");
      }
    }).catch((error) => thunkAPI.rejectWithValue(error));
  }
);

export const editUser = createAsyncThunk<EditUserPayload, EditUserPayload>(
  "users/editUser",
  async (updatedUser, thunkAPI) => {
    return new Promise<EditUserPayload>((resolve, reject) => {
      try {
        if (!updatedUser.employeeId || !updatedUser.name || !updatedUser.startDate) {
          reject("Invalid user data provided");
        }

        const existingUsers = JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE_KEY) || "[]");
        const index = existingUsers.findIndex((user) => user.employeeId === updatedUser.employeeId);

        if (index === -1) {
          reject("User not found");
        } else {
          existingUsers[index] = updatedUser;
          localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(existingUsers));
          resolve(updatedUser);
        }
      } catch (error) {
        reject("Failed to update user");
      }
    }).catch((error) => thunkAPI.rejectWithValue(error));
  }
);
