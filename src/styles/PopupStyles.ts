import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const Popup = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 80%; 
  max-width: 600px; 
  text-align: center;

  h3 {
    font-size: 1.5rem;
    color: #135846;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

export const CloseButton = styled.button`
  margin-top: 1rem; 
  padding: 0.5rem 1rem;
  background: #135846;
  color: #fff;
  border: none;
  border-radius: 5px; 
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0e4636;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(19, 88, 70, 0.3);
  }
`;
