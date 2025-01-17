import styled from "styled-components";

export const LatestMessagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 1rem 0;
  box-sizing: border-box;
`;


export const MessageCard = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  height: 280px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  text-align: center;
  position: relative; 

  h4 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  p {
    margin: 0.3rem 0;
    font-size: 0.7rem;
    color: #555;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: flex-start; 
  }

  .message-content {
    margin: 0.3rem 0;
    font-size: 0.9rem;
    color: #555;
  }

  .message-footer {
    display: flex;
    align-items: center;
    justify-content: flex-start; 
    gap: 0.5rem;
    margin-top: 1rem;

    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }

    span {
      font-size: 0.9rem;
      font-weight: bold;
    }
  }

  .status-icons {
    position: absolute;
    bottom: 1rem;
    right: 1rem; /* Cambiado de left a right para mover el icono a la derecha */

    svg {
      font-size: 1.5rem;
      transition: color 0.3s ease;
    }

    .unread {
      color: red;
    }

    .read {
      color: green;
    }
  }
`;
export const StyledMessagesCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
`;

export const NavigationButton = styled.button`
  background: #135846;
  border: none;
  color: #fff;
  border-radius: 10px;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0e4636;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(19, 88, 70, 0.3);
  }
`;

