import { ReactNode } from "react";

export interface User {
    email: string;
    password: string;  
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
  }
  
  export interface AuthContextProps {
    state: AuthState;
    login: (user: User, token: string) => void;
    logout: () => void;
  }  
  
  export type AuthAction = 
    | { type: "LOGIN"; payload: User }
    | { type: "LOGOUT" };

export interface AuthProviderProps {
        children: ReactNode;
      }