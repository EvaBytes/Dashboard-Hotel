import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('src/data/rooms.json');
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

export const createRoom = createAsyncThunk(
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

export const deleteRoom = createAsyncThunk(
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

export const editRoom = createAsyncThunk(
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

export const fetchRoomById = createAsyncThunk(
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