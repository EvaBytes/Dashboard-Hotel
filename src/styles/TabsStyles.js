import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
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
  color: #6e6e6e;
  border-bottom: 2px solid transparent;
  font-weight: normal;
  transition: color 0.3s ease, border-bottom 0.3s ease;

  &.active {
    color: #135846;
    border-bottom: 2px solid #135846;
    font-weight: bold;
  }

  &:hover {
    color: #135846;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: .5rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
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
  color: #6e6e6e;

  &::placeholder {
    color: #aaa;
  }
`;

export const ActionButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #135846;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0f423c;
  }
`;
