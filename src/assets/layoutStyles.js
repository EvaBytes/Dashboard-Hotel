import { styled } from "@mui/material/styles";

export const LayoutContainer = styled("div")({
  display: "flex",
  height: "100vh",
  flexDirection: "column",  
});

export const SidebarContainer = styled("div")(({ sidebarOpen }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: sidebarOpen ? "250px" : "0", 
  height: "100vh",
  backgroundColor: "#fff",
  transition: "0.3s",  
  zIndex: 1000,  
}));

export const MainContent = styled("div")({
  marginLeft: "250px",  
  transition: "0.3s",  
  flexGrow: 1,
});

export const Content = styled("div")({
  padding: "20px",
  backgroundColor: "#f5f5f5",
  overflowY: "auto",
});
