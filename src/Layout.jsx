import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import { Rooms } from "./pages/Rooms";
import { Contacts } from "./pages/Contacts";
import { Users } from "./pages/Users";
import { LayoutContainer, MainContent, Content, SidebarContainer } from "./assets/layoutStyles";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);  
  };

  return (
    <LayoutContainer>
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <SidebarContainer sidebarOpen={sidebarOpen}>
        {sidebarOpen && <Sidebar />}
      </SidebarContainer>
      
      <MainContent style={{ marginLeft: sidebarOpen ? "250px" : "0" }}>
        <Content>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export { Layout };
