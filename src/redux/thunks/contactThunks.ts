import { createAsyncThunk } from "@reduxjs/toolkit";
import { Message, FetchMessagesError } from "../../interfaces/contact/ContactState";
import { API_URL } from "../../config"; 

export const fetchMessages = createAsyncThunk<
  Message[],
  void,
  { rejectValue: FetchMessagesError }
>(
  "contact/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); 

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/v1/contacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to fetch messages from the server");
      }

      const { data } = await response.json();
      return data as Message[];
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue({
          message: error.message || "An unknown error occurred while fetching messages",
        });
      }
      return rejectWithValue({
        message: "An unexpected error occurred",
      });
    }
  }
);
