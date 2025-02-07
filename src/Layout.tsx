import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar.tsx";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { LayoutContainer, MainContent, Content, SidebarContainer } from "./styles/layoutStyles.ts";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutContainer>
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <SidebarContainer $sidebarOpen={sidebarOpen}>
        {sidebarOpen && <Sidebar />}
      </SidebarContainer>

      <MainContent $sidebarOpen={sidebarOpen}>
        <Content>
          <Outlet />
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export { Layout };