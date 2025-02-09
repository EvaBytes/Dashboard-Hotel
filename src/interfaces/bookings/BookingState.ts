export interface Guest {
  fullName: string;
  reservationNumber: string;
  image: string;
}

export interface Booking {
  guest: Guest;
  reservationNumber: string;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  specialRequest: string;
  roomType: string;
  status: "Check-In" | "Check-Out" | "In Progress";
  roomPhoto: string[];
  facilities: string;
  offerPrice: string;
  photo: string; 
  roomNumber: string; 
  rate: string; 
}

  export interface BookingState {
    bookings: Booking[];
    filteredBookings: Booking[];
    activeTab: string;
    searchText: string;
    sortBy: string | null;
    sortOrder: "asc" | "desc";
    currentPage: number;
    itemsPerPage: number;
    loading: "idle" | "pending" | "fulfilled" | "rejected";
    error: string | null;
    currentBooking: Booking | null;
  }