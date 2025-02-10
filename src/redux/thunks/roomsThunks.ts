import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { NewRoomPayload, Room } from "../../interfaces/room/RoomState";

const simulateRequest = async <T>(data: T, delay: number = 400): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

const isValidStatus = (status: string): status is Room['status'] => {
  return ["Available", "Booked", "In Progress"].includes(status);
};

export const fetchRooms = createAsyncThunk<Room[], void, { state: RootState }>(
  "rooms/fetchRooms",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/data/Rooms.json", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch rooms");
      }
      let rooms: Room[] = await response.json();

      rooms = rooms.map((room: Room) => ({
        ...room,
        status: isValidStatus(room.status) ? room.status : "Available",
      }));

      return rooms;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchRoomById = createAsyncThunk<Room, string, { state: RootState }>(
  "rooms/fetchRoomById",
  async (roomNumber, thunkAPI) => {
    try {
      const { rooms } = thunkAPI.getState().rooms;
      const room = rooms.find((r: Room) => r.roomNumber === roomNumber);

      if (!room) {
        throw new Error(`Room with roomNumber ${roomNumber} not found`);
      }

      const responseRoom = await simulateRequest(room);
      return responseRoom;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const createRoom = createAsyncThunk<Room, NewRoomPayload, { state: RootState }>(
  "rooms/createRoom",
  async (roomData, thunkAPI) => {
    try {
      const newRoom: Room = {
        ...roomData,
        roomNumber: crypto.randomUUID(),
        status: isValidStatus(roomData.status) ? roomData.status : "Available", 
      };

      const responseRoom = await simulateRequest(newRoom);
      return responseRoom;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteRoom = createAsyncThunk<string, string, { state: RootState }>(
  "rooms/deleteRoom",
  async (roomNumber, thunkAPI) => {
    try {
      await simulateRequest(null);
      return roomNumber;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const editRoom = createAsyncThunk<Room, Room, { state: RootState }>(
  "rooms/editRoom",
  async (updatedRoom, thunkAPI) => {
    try {
      if (!updatedRoom.roomNumber || !updatedRoom.roomType || !updatedRoom.rate) {
        throw new Error("Invalid room data provided");
      }

      if (!isValidStatus(updatedRoom.status)) {
        throw new Error("Invalid status provided");
      }

      const responseRoom = await simulateRequest(updatedRoom);
      return responseRoom;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);