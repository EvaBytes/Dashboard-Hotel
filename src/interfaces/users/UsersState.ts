export interface UsersState {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  users: User[];
  filteredUsers: User[];
  activeTab: string;
  searchText: string;
  loading: boolean;
  error: string | null;
  currentUser: User | null;
}

export interface User {
    photo: string;
    name: string;
    employeeId: string;
    email: string;
    startDate: number | string;
    description: string;
    contact: string;
    status: "ACTIVE" | "INACTIVE"; 
  }

  export interface CreateUserPayload {
    name: string;
    startDate: string;
  }
  
  export interface EditUserPayload {
    photo: string;
    employeeId: string;
    email: string;
    name: string;
    startDate: string;
    description: string;
    contact: string;
    status: "ACTIVE" | "INACTIVE"; 
  }

  export interface EditPayload {
    employeeId: string;
    name: string;
    description: string;
    contact: string;
    status: "ACTIVE" | "INACTIVE";
  }
  
export interface NewUserPayload {
  name: string;
  photo: string;
  fullName: string;
  employeeId: string;
  email: string;
  startDate: string;
  description: string;
  contact: string;
  status: "ACTIVE" | "INACTIVE";
}
  