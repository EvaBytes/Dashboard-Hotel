import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Popup = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;

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
  margin-top: 10px;
  padding: 0.8rem 2rem;
  border: none;
  background-color: #135846;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
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
