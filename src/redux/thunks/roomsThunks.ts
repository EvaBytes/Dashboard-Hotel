import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewRoomPayload, Room } from "../../interfaces/room/RoomState.ts"

export const fetchRooms = createAsyncThunk<Room[], void, { rejectValue: string }>(
  'rooms/fetchRooms',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('public/data/rooms.json');
      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createRoom = createAsyncThunk<Room, NewRoomPayload, { rejectValue: string }>(
  'rooms/createRoom',
  async (roomData, thunkAPI) => {
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });
      if (!response.ok) {
        throw new Error('Failed to create room');
      }
      const newRoom = await response.json();
      return newRoom;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteRoom = createAsyncThunk<string, string, { rejectValue: string }>(
  'rooms/deleteRoom',
  async (roomNumber, thunkAPI) => {
    try {
      const response = await fetch(`/api/rooms/${roomNumber}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete room');
      }
      return roomNumber;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editRoom = createAsyncThunk<Room, Room, { rejectValue: string }>(
  'rooms/editRoom',
  async (updatedRoomData, thunkAPI) => {
    try {
      const response = await fetch(`/api/rooms/${updatedRoomData.roomNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRoomData),
      });
      if (!response.ok) {
        throw new Error('Failed to update room');
      }
      const updatedRoom = await response.json();
      return updatedRoom;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRoomById = createAsyncThunk<Room, string, { rejectValue: string }>(
  'rooms/fetchRoomById',
  async (roomNumber, thunkAPI) => {
    try {
      const response = await fetch(`/api/rooms/${roomNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch room');
      }
      const room = await response.json();
      return room;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);