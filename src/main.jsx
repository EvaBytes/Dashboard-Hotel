import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./verification/AuthContext.jsx";
import { Provider } from "react-redux"; 
import { store } from "./redux/store.js";
import { GlobalStyles } from "./styles/globalStyles.js";
import { Layout } from "./Layout.jsx";
import { Login } from "./verification/Login.jsx";
import { theme } from "./styles/theme.js";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Bookings } from "./pages/Bookings/Bookings.jsx";
import { Rooms } from "./pages/Rooms/Rooms.jsx";
import { NewRoom } from "./pages/Rooms/NewRoom.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Users } from "./pages/Users/Users.jsx";
import { NewUser } from "./pages/Users/NewUser.jsx";
import { GuestDetails } from "./pages/Bookings/GuestDetails.jsx";
import { NewBooking } from "./pages/Bookings/NewBooking.jsx"; 
import { PrivateRoute } from "./verification/PrivateRoute.jsx";

createRoot(document.getElementById("root")).render(
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
                <Route path="contact" element={<Contact />} />
                <Route path="users" element={<Users />} />
                <Route path="guest/:reservationId" element={<GuestDetails />} />
                <Route path="new-booking" element={<NewBooking />} />
                <Route path="new-room" element={<NewRoom />} />
                <Route path="new-user" element={<NewUser />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  </StrictMode>
);
