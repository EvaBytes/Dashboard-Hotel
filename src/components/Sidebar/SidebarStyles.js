import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.text.primary};
  border-radius: 3px;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SidebarTitleIcon = styled.span`
  display: flex;
  color: darkgreen;
  align-items: center;
  justify-content: center;
  font-size: 38px;
  margin-right: 0.7rem;
  margin-left: 2rem;
`;

export const SidebarTitle = styled.h2`
  color: #212121;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SidebarListItem = styled.li`
  margin-bottom: 1rem;
`;

export const SidebarLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

export const SidebarIcon = styled.span`
  font-size: 20px;
  margin-right: 0.5rem;
  display: inline-block;
`;

export const SidebarFooter = styled.footer`
  text-align: center;
  margin-top: 1.2rem;
  font-size: 12px;
`;
