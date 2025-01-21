import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.palette.background.paper};
  margin-top: 4rem;
  padding: 0 1rem;
`;

export const Tab = styled.button.attrs(({ isActive }) => ({
  className: isActive ? "active" : "",
}))`
  padding: 0.8rem 1.5rem;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => props.theme.palette.text.secondary};
  border-bottom: 2px solid transparent;
  font-weight: normal;
  transition: color 0.3s ease, border-bottom 0.3s ease;

  &.active {
    color: ${(props) => props.theme.palette.secondary.main};
    border-bottom: 2px solid ${(props) => props.theme.palette.secondary.main};
    font-weight: bold;
  }

  &:hover {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme.palette.background.default};
  border-radius: 10px;
  padding: 0.5rem 1rem;
  border: 1px solid lightgray;};
`;

export const SearchIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  font-size: 14px;
  color: ${(props) => props.theme.palette.text.primary};

  &::placeholder {
    color: gray;
  }
`;

export const ActionButton = styled.button`
  padding: ${(props) => props.theme.styles.button.padding};
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.primary.main};
  border: none;
  border-radius: ${(props) => props.theme.styles.button.borderRadius};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.styles.button.hover.backgroundColor};
    color: ${(props) => props.theme.styles.button.hover.color};
  }

  &:disabled {
    background-color: ${(props) => props.theme.styles.button.disabled.backgroundColor};
    color: ${(props) => props.theme.styles.button.disabled.color};
    cursor: not-allowed;
  }
`;
