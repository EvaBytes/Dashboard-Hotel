import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./Authentication/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GlobalStyles } from "./styles/globalStyles";
import { Layout } from "./Layout";
import { Login } from "./Authentication/Login";
import { theme } from "./styles/theme";
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings/Bookings";
import { Rooms } from "./pages/Rooms/Rooms";
import { NewRoom } from "./pages/Rooms/NewRoom";
import { RoomDetails } from "./pages/Rooms/RoomDetails";
import { Contact } from "./pages/Contact";
import { Users } from "./pages/Users/Users";
import { NewUser } from "./pages/Users/NewUser";
import { UserDetails } from "./pages/Users/UserDetails";
import { EditUser } from "./pages/Users/EditUser";
import { GuestDetails } from "./pages/Bookings/GuestDetails";
import { EditBooking } from "./pages/Bookings/EditGuestBooking";
import { NewBooking } from "./pages/Bookings/NewBooking";
import { PrivateRoute } from "./Authentication/PrivateRoute";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find the id 'root'");
}
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
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
                <Route path="room-details/:roomNumber" element={<RoomDetails />} />
                <Route path="contact" element={<Contact />} />
                <Route path="users" element={<Users />} />
                <Route path="new-user" element={<NewUser />} />
                <Route path="user-details/:employeeId" element={<UserDetails />} />
                <Route path="edit-user/:employeeId" element={<EditUser />} />
                <Route path="guest/:reservationNumber" element={<GuestDetails />} />
                <Route path="edit/:reservationNumber" element={<EditBooking />} />
                <Route path="new-booking" element={<NewBooking />} />
                <Route path="new-room" element={<NewRoom />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  </StrictMode>
);