import { styled } from "@mui/material/styles";

export const NavbarContainer = styled("nav")(({ sidebarOpen }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#fff",
    borderRadius: "3px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    top: "0",
    position: "fixed",
    width: sidebarOpen ? "calc(100% - 240px)" : "100%",  
    marginLeft: sidebarOpen ? "250px" : "0", 
    transition: "width 0.4s ease-in-out, margin-left 0.4s ease-in-out",  
}));

export const NavbarLeft = styled("div")({
    display: "flex",
    alignItems: "center",
});

export const NavbarRight = styled("div")({
    display: "flex",
    alignItems: "center",
});

export const IconButton = styled("button")({
    background: "none",
    border: "none",
    margin: "0 0.8rem",
    cursor: "pointer",
    padding: "0",
    "&:hover": {
        opacity: 0.7,
    },
});
