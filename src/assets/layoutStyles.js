import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${(props) => (props.$sidebarOpen ? "250px" : "0")}; 
  height: 100vh;
  background-color: #fff;
  transition: width 0.3s ease;
  z-index: 100;
  overflow: hidden; // Esconde contenido si el ancho es 0
`;

export const MainContent = styled.div`
  margin-left: ${(props) => (props.$sidebarOpen ? "250px" : "0")};
  transition: margin-left 0.3s ease;
  flex-grow: 1;
  background-color: #f5f5f5;
`;

export const Content = styled.div`
  padding: 20px;
  overflow-y: auto;
`;
