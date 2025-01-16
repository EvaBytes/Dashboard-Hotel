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
  width: ${(props) => (props.sidebarOpen ? "250px" : "0")}; // Ancho dinámico basado en props
  height: 100vh;
  background-color: #fff;
  transition: 0.3s;
  z-index: 100;
`;

export const MainContent = styled.div`
  margin-left: 250px; // Espacio reservado para la barra lateral
  transition: 0.3s;
  flex-grow: 1;
`;

export const Content = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  overflow-y: auto;
`;
