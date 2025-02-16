export interface Message {
    messageId: string;
    date: string;
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    comment: string;
  }
  
  export interface ContactState {
    allMessages: Message[];
    archivedMessages: Message[];
    activeTab: string;
    currentPage: number;
    itemsPerPage: number;
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
  }

  export interface FetchMessagesError {
    message: string;
  }