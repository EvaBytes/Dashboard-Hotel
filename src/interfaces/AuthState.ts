import { ReactNode } from "react";

export interface User {
    username: string;
    password: string;  
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
  }
  
  export interface AuthContextProps {
    state: AuthState;
    login: (user: User) => void;
    logout: () => void;
  }
  
  export type AuthAction = 
    | { type: "LOGIN"; payload: User }
    | { type: "LOGOUT" };

export interface AuthProviderProps {
        children: ReactNode;
      }