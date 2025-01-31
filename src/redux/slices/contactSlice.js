import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../thunks/contactThunks.js";

const initialState = {
  allMessages: [],
  archivedMessages: [],
  activeTab: "All Contacts",
  currentPage: 1,
  itemsPerPage: 5,
  loading: false,
  error: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    archiveMessage: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (msg) => msg.messageId === messageId
      );
      if (messageIndex !== -1) {
        const [messageToArchive] = state.allMessages.splice(messageIndex, 1);
        state.archivedMessages.push(messageToArchive);
      }
    },
    unarchiveMessage: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.archivedMessages.findIndex(
        (msg) => msg.messageId === messageId
      );
      if (messageIndex !== -1) {
        const [messageToUnarchive] = state.archivedMessages.splice(
          messageIndex,
          1
        );
        state.allMessages.push(messageToUnarchive);
      }
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.allMessages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch messages";
      });
  },
});


export const {archiveMessage,unarchiveMessage,setActiveTab,setCurrentPage} = contactSlice.actions;
export default contactSlice.reducer;
