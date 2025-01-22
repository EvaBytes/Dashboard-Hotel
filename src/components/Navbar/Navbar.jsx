import React from "react";
import { AiOutlineMail, AiOutlineBell } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { BiSolidLeftArrowSquare, BiSolidRightArrowSquare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice"; 
import { NavbarContainer, NavbarLeft, NavbarRight, IconButton } from "./navbarStyles";

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login");
  };

  return (
    <NavbarContainer $sidebarOpen={sidebarOpen}>
      <NavbarLeft>
        <IconButton onClick={toggleSidebar}>
          {sidebarOpen ? (
            <BiSolidLeftArrowSquare size={24} />
          ) : (
            <BiSolidRightArrowSquare size={24} />
          )}
        </IconButton>
        <h1>Dashboard</h1>
      </NavbarLeft>
      <NavbarRight>
        <IconButton>
          <AiOutlineMail size={24} />
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
