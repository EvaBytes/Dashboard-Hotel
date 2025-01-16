import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./assets/globalStyles";
import { AuthProvider, useAuth } from "./verification/AuthContext";
import { Layout } from "./Layout";
import { Login } from "./verification/Login";
import { theme } from "./assets/theme"; 
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import { Rooms } from "./pages/Rooms";
import { Contact } from "./pages/Contact";
import { Users } from "./pages/Users";
import GuestDetails from "./pages/GuestDetails"; 

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles /> 
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="contact" element={<Contact />} />
              <Route path="users" element={<Users />} />
              <Route path="guest-details" element={<GuestDetails />} /> 
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
