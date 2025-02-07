import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./Authentication/AuthContext.tsx";
import { Provider } from "react-redux"; 
import { store } from "./redux/store.ts";
import { GlobalStyles } from "./styles/globalStyles.ts";
import { Layout } from "./Layout.tsx";
import { Login } from "./Authentication/Login.tsx";
import { theme } from "./styles/theme.ts";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Bookings } from "./pages/Bookings/Bookings.tsx";
import { Rooms } from "./pages/Rooms/Rooms.tsx";
import { NewRoom } from "./pages/Rooms/NewRoom.tsx";
import { RoomDetails } from "./pages/Rooms/RoomDetails.tsx";
import { Contact } from "./pages/Contact.tsx";
import { Users } from "./pages/Users/Users.tsx";
import { NewUser } from "./pages/Users/NewUser.tsx";
import { UserDetails } from "./pages/Users/UserDetails.tsx";
import { EditUser } from "./pages/Users/EditUser.tsx";
import { GuestDetails } from "./pages/Bookings/GuestDetails.tsx";
import { EditBooking } from "./pages/Bookings/EditGuestBooking.tsx";
import { NewBooking } from "./pages/Bookings/NewBooking.tsx"; 
import { PrivateRoute } from "./Authentication/PrivateRoute.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not finde the id 'root'");
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
                <Route path="guest/:reservationId" element={<GuestDetails />} />
                <Route path="edit/:reservationId" element={<EditBooking />} />
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
