import { createAsyncThunk } from "@reduxjs/toolkit";
import messagesData from "../../data/Messages.json";

const simulateApiDelay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchMessages = createAsyncThunk(
  "contact/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      await simulateApiDelay(400);
      if (!messagesData || messagesData.length === 0) {
        throw new Error("No messages found");
      }

      return messagesData; 
    } catch (error) {

      return rejectWithValue(error.message || "Failed to fetch messages");
    }
  }
);
