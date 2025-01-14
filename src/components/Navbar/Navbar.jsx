import React, { useState } from "react";
import { AiOutlineMessage, AiOutlineBell} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { NavbarContainer, NavbarLeft, NavbarRight, IconButton } from "./navbarStyles";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");  
  };

  return (
    <NavbarContainer>
      <NavbarLeft>
        <IconButton onClick={toggleSidebar}>
          <HiMenuAlt2 size={24} />
        </IconButton>
        <h1>Dashboard</h1>
      </NavbarLeft>
      <NavbarRight>
        <IconButton>
          <AiOutlineMessage size={24} />
        </IconButton>
        <IconButton>
          <AiOutlineBell size={24} />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <FiLogOut size={24} />
        </IconButton>
      </NavbarRight>
    </NavbarContainer>
  );
};

export { Navbar };
