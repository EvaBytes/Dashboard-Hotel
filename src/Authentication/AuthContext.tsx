import React, { createContext, useReducer, useContext, useEffect, useState} from "react";
import { AuthState, AuthContextProps, AuthAction, AuthProviderProps} from "../interfaces/AuthState.ts";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state:AuthState, action:AuthAction): AuthState => {
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
    if (token && user) {
      dispatch({ type: "LOGIN", payload: user });
    }
    setIsLoading(false);
  }, []);

  const login = (user) => {
    localStorage.setItem("authToken", "fakeToken");
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

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
    throw new Error("useAuth without AuthProvider is not allowed");
  }
  return context;
};
