import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { NewRoomPayload, Room } from "../../interfaces/room/RoomState";
import { API_URL } from "../../config/index";

export const isValidStatus = (status: string): status is Room['status'] => {
  return ["Available", "Booked", "In Progress"].includes(status);
};

export const fetchRooms = createAsyncThunk<Room[], void, { state: RootState }>(
  "rooms/fetchRooms",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/v1/rooms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error fetching rooms");
      }

      const { data } = await response.json();
      return data.map((room: Room) => ({
        ...room,
        status: isValidStatus(room.status) ? room.status : "Available",
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);


export const fetchRoomById = createAsyncThunk<Room, string, { state: RootState }>(
  "rooms/fetchRoomById",
  async (roomNumber, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/v1/rooms/${roomNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || `Room with roomNumber ${roomNumber} not found`);
      }

      const { data } = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);

export const createRoom = createAsyncThunk<Room, NewRoomPayload, { state: RootState }>(
  "rooms/createRoom",
  async (roomData, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/v1/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error creating room");
      }

      const { data } = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);


export const deleteRoom = createAsyncThunk<string, string, { state: RootState }>(
  "rooms/deleteRoom",
  async (roomNumber, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/v1/rooms/${roomNumber}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error deleting room");
      }

      return roomNumber;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);


export const editRoom = createAsyncThunk<Room, Room, { state: RootState }>(
  "rooms/editRoom",
  async (updatedRoom, thunkAPI) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      if (!updatedRoom.roomNumber || !updatedRoom.roomType || !updatedRoom.rate) {
        throw new Error("Invalid room data provided");
      }

      if (!isValidStatus(updatedRoom.status)) {
        throw new Error("Invalid status provided");
      }

      const response = await fetch(`${API_URL}/api/v1/rooms/${updatedRoom.roomNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRoom),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Error updating room");
      }

      const { data } = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
    }
  }
);