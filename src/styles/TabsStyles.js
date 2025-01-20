import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
`;

export const Tab = styled.button`
  padding: 0.8rem 1rem;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#135846" : "#6E6E6E")};
  border-bottom: ${(props) => (props.active ? "2px solid #135846" : "2px solid transparent")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  transition: color 0.3s ease, border-bottom 0.3s ease;

  &:hover {
    color: #135846;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 0.5rem;
  margin-left:auto;
  background-color: #fff;
  width: 17rem; 
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  font-style: italic;
`;


