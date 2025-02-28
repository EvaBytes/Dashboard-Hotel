import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import { AuthState, AuthContextProps, AuthAction, AuthProviderProps, User } from "../interfaces/AuthState";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log("Token en useEffect AuthProvider:", token);
    
    if (token && user) {
      dispatch({ type: "LOGIN", payload: user });
    }
    setIsLoading(false);
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem("authToken", token); 
    localStorage.setItem("user", JSON.stringify(user));
    console.log("Token guardado en login:", token);
  
    dispatch({ type: "LOGIN", payload: user });
  };
  

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token actualizado:", token);
  }, [state.isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};