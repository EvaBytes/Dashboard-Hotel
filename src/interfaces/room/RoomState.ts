export interface Guest {
  fullName: string;
  reservationNumber: string;
  image: string;
}

export interface Room {
  roomNumber: string;
  roomType: string;
  facilities: string;
  rate: string;
  offerPrice: string;
  status: "Available" | "Booked" | "In Progress";
  roomPhoto: string;
  guest?: Guest;
  orderDate?: string;
  checkIn?: string;
  checkOut?: string;
  description?: string;
  offer?: string;
  discount?: string;
  cancellationPolicy?: string;
  amenities?: string[];
  photos?: string[];
}

export interface RoomState {
  rooms: Room[];
  filteredRooms: Room[];
  activeTab: string;
  sortBy: string | null;
  sortOrder: "asc" | "desc";
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
  currentRoom: Room | null;
}

export interface NewRoomPayload {
  roomPhoto: string;
  roomNumber: string;
  roomType: string;
  facilities: string;
  rate: string;
  offerPrice: string;
  status: string;
  guest: Guest;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  description: string;
  offer: string;
  discount: string;
  cancellationPolicy: string;
  amenities: string[];
  photos?: string[];
}