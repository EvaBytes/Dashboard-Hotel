export interface UsersState {
  users: User[];
  filteredUsers: User[];
  activeTab: string;
  searchText: string;
  loading: boolean;
  error: string | null;
  currentUser: null;
}

export interface User {
    photo: string;
    name: string;
    employeeId: string;
    email: string;
    startDate: Date;
    description: string;
    contact: string;
    status: "ACTIVE" | "INACTIVE"; 
  }
  