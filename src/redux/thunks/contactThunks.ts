import { createAsyncThunk } from "@reduxjs/toolkit";
import messagesData from "../../../public/data/Messages.json";
import { Message,FetchMessagesError } from "../../interfaces/contact/ContactState.ts";

const simulateApiDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchMessages = createAsyncThunk<Message[],void,{rejectValue:FetchMessagesError}>(
  "contact/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      await simulateApiDelay(400);
      if (!messagesData || messagesData.length === 0) {
        throw new Error("No messages found");
      }

      return messagesData as Message[];
    } catch (error) {
      return rejectWithValue({message: error.message || "Failed to fetch messages"});
    }
  }
);