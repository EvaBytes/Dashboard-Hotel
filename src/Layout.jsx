import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import { Rooms } from "./pages/Rooms";
import { Users } from "./pages/Users";
import { styled } from "@mui/material/styles";

// Estilos personalizados usando `styled`
const LayoutContainer = styled("div")({
  display: "flex",
  height: "100vh",
});

const MainContent = styled("div")({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
});

const Content = styled("div")({
  padding: "20px",
  backgroundColor: "#f5f5f5",
  overflowY: "auto",
});

const Layout = () => {
  return (
    <LayoutContainer>
      <Sidebar /> 
      <MainContent>
        <Navbar /> 
        <Content>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export { Layout };
