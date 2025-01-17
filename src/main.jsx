import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./assets/globalStyles.js";
import { AuthProvider, useAuth } from "./verification/AuthContext.jsx";
import { Layout } from "./Layout.jsx";
import { Login } from "./verification/Login.jsx";
import { theme } from "./assets/theme.js"; 
import { Dashboard } from "./pages/Dashboard.jsx";
import { Bookings } from "./pages/Bookings.jsx";
import { Rooms } from "./pages/Rooms.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Users } from "./pages/Users.jsx";
import {GuestDetails} from "./pages/GuestDetails.jsx"; 

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
              <Route path="contacts" element={<Contact />} />
              <Route path="users" element={<Users />} />
              <Route path="guest-details" element={<GuestDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
