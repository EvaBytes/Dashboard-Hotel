import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";
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
          <Outlet></Outlet>
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export { Layout };
