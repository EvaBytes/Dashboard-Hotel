import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom"; 

export const SidebarContainer = styled("aside")(({ theme }) => ({
  width: "250px", 
  backgroundColor: theme.palette.primary.main, 
  color: theme.palette.common.white,
  height: "100vh",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const SidebarTitle = styled("h2")({
  marginBottom: "20px",
});

export const SidebarList = styled("ul")({
  listStyle: "none",
  padding: 0,
});

export const SidebarListItem = styled("li")({
  marginBottom: "15px",
});

export const SidebarLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const SidebarFooter = styled("footer")({
  textAlign: "center",
  marginTop: "20px",
  fontSize: "12px",
});
