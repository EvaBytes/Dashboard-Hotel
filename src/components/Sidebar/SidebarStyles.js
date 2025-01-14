import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom"; 

export const SidebarContainer = styled("aside")(({ theme }) => ({
  width: "250px", 
  backgroundColor: theme.palette.primary.main, 
  color: theme.palette.text.primary,
  borderRadius: "3px",
  height: "100vh",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

export const SidebarTitleIcon = styled("span")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const SidebarTitle = styled("h2")(({ theme }) => ({
  color: "#212121",
  marginBottom: "1.2rem",

}));

export const SidebarList = styled("ul")({
  listStyle: "none",
  padding: 0,
});

export const SidebarListItem = styled("li")({
  marginBottom: "1rem",
});

export const SidebarLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const SidebarIcon = styled("span")({
  fontSize: "20px",
  marginRight: ".5rem",
  display: "inline-block",
});

export const SidebarFooter = styled("footer")({
  textAlign: "center",
  marginTop: "1.2rem",
  fontSize: "12px",
});
