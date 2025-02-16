export interface User {
    name: string;
    email: string;
    image: string;
  }

  export interface NavbarProps {
    toggleSidebar: () => void;
    sidebarOpen: boolean;
  }

  export interface UserContainerProps {
    user: User;
    onSave?: (editedUser: User) => void;
  }
