import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AuthProvider, useAuth } from "./verification/AuthContext";
import { Layout } from "./Layout";
import { Login } from "./verification/Login";
import { theme } from "./assets/theme"; 
import { authTheme } from "./assets/authTheme"; 

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <ThemeProvider theme={authTheme}>
                <CssBaseline />
                <Login />
              </ThemeProvider>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Layout />
                </ThemeProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
