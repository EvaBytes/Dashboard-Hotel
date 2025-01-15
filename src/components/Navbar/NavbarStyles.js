import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  top: 0;
  position: fixed;
  width: ${(props) => (props.sidebarOpen ? "calc(100% - 240px)" : "100%")};
  margin-left: ${(props) => (props.sidebarOpen ? "250px" : "0")};
  transition: width 0.4s ease-in-out, margin-left 0.4s ease-in-out;
`;

export const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  margin: 0 0.8rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.7;
  }
`;
