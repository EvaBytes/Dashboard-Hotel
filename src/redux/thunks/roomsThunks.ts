import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewRoomPayload, Room } from "../../interfaces/room/RoomState.ts";

const ROOMS_LOCAL_STORAGE_KEY = "roomsData";

const simulateApiCall = (data: unknown, delay = 200) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

const isValidStatus = (status: string): status is Room['status'] => {
  return ["Available", "Booked", "In Progress"].includes(status);
};

export const fetchRooms = createAsyncThunk<Room[], void>(
  "rooms/fetchRooms",
  async (_, thunkAPI) => {
    try {
      let rooms = JSON.parse(localStorage.getItem(ROOMS_LOCAL_STORAGE_KEY) || "[]");

      if (rooms.length === 0) {
        const response = await fetch("/data/Rooms.json", {
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        rooms = await response.json();
      }

      rooms = rooms.map((room: Room) => ({
        ...room,
        status: isValidStatus(room.status) ? room.status : "Available",
      }));

      localStorage.setItem(ROOMS_LOCAL_STORAGE_KEY, JSON.stringify(rooms));

      return rooms;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRoomById = createAsyncThunk<Room, string>(
  "rooms/fetchRoomById",
  async (roomNumber, thunkAPI) => {
    try {
      const rooms = JSON.parse(localStorage.getItem(ROOMS_LOCAL_STORAGE_KEY) || "[]");
      const room = rooms.find((r: Room) => r.roomNumber === roomNumber);

      if (!room) {
        throw new Error(`Room with roomNumber ${roomNumber} not found`);
      }

      return room;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createRoom = createAsyncThunk<Room, NewRoomPayload>(
  "rooms/createRoom",
  async (roomData, thunkAPI) => {
    try {
      await simulateApiCall(null);
      const existingRooms = JSON.parse(localStorage.getItem(ROOMS_LOCAL_STORAGE_KEY) || "[]");
      const newRoom: Room = {
        ...roomData,
        roomNumber: crypto.randomUUID(),
        status: isValidStatus(roomData.status) ? roomData.status : "Available", 
      };

      const updatedRooms = [...existingRooms, newRoom];
      localStorage.setItem(ROOMS_LOCAL_STORAGE_KEY, JSON.stringify(updatedRooms));
      return newRoom;
    } catch {
      return thunkAPI.rejectWithValue("Failed to create room");
    }
  }
);

export const deleteRoom = createAsyncThunk<string, string>(
  "rooms/deleteRoom",
  async (roomNumber, thunkAPI) => {
    try {
      const existingRooms = JSON.parse(localStorage.getItem(ROOMS_LOCAL_STORAGE_KEY) || "[]");
      const updatedRooms = existingRooms.filter((room: Room) => room.roomNumber !== roomNumber);

      localStorage.setItem(ROOMS_LOCAL_STORAGE_KEY, JSON.stringify(updatedRooms));
      return roomNumber;
    } catch {
      return thunkAPI.rejectWithValue("Failed to delete room");
    }
  }
);

export const editRoom = createAsyncThunk<Room, Room>(
  "rooms/editRoom",
  async (updatedRoom, thunkAPI) => {
    try {
      if (!updatedRoom.roomNumber || !updatedRoom.roomType || !updatedRoom.rate) {
        throw new Error("Invalid room data provided");
      }

      const existingRooms = JSON.parse(localStorage.getItem(ROOMS_LOCAL_STORAGE_KEY) || "[]");
      const index = existingRooms.findIndex((room: Room) => room.roomNumber === updatedRoom.roomNumber);

      if (index === -1) {
        throw new Error("Room not found");
      }

      if (!isValidStatus(updatedRoom.status)) {
        throw new Error("Invalid status provided");
      }

      existingRooms[index] = updatedRoom;
      localStorage.setItem(ROOMS_LOCAL_STORAGE_KEY, JSON.stringify(existingRooms));

      return updatedRoom;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);