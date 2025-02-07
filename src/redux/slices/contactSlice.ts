import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMessages } from "../thunks/contactThunks.ts";
import { RootState } from "../../redux/store.ts"
import { ContactState, Message } from "../../interfaces/contact/ContactState.ts";

const initialState: ContactState = {
  allMessages: [],
  archivedMessages: [],
  activeTab: "All Contacts",
  currentPage: 1,
  itemsPerPage: 5,
  loading: "idle", 
  error: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    archiveMessage: (state, action: PayloadAction<string>) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (msg) => msg.messageId === messageId
      );
      if (messageIndex !== -1) {
        const [messageToArchive] = state.allMessages.splice(messageIndex, 1);
        state.archivedMessages.push(messageToArchive);
      }
    },
    unarchiveMessage: (state, action: PayloadAction<string>) => {
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
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.loading = 'fulfilled';
        state.allMessages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.payload ? action.payload.message : "Failed to fetch messages";
      });
  },
});

export const {archiveMessage, unarchiveMessage,setActiveTab,setCurrentPage,clearError} = contactSlice.actions;

export const selectAllMessages = (state: RootState): Message[] => state.contact.allMessages;
export const selectArchivedMessages = (state: RootState): Message[] => state.contact.archivedMessages;
export const selectActiveTab = (state: RootState): string => state.contact.activeTab;
export const selectCurrentPage = (state: RootState): number => state.contact.currentPage;
export const selectItemsPerPage = (state: RootState): number => state.contact.itemsPerPage;
export const selectLoading = (state: RootState): 'idle' | 'pending' | 'fulfilled' | 'rejected' => state.contact.loading;
export const selectError = (state: RootState): string | null => state.contact.error;

export default contactSlice.reducer;