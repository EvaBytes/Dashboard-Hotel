import styled from "styled-components";

export const LatestMessagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  width: 100%;
  margin: auto;
  padding: 1rem 0;
  box-sizing: border-box;
  overflow-x: auto; 
  scroll-snap-type: x mandatory; 
`;

export const MessageCard = styled.div`
  background: ${(props) => props.theme.palette.background.paper};
  padding: 1rem;
  border-radius: ${(props) => props.theme.styles.button.borderRadius};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  position: relative;

  h4 {
    margin: 0;
    font-size: ${(props) => props.theme.typography.h2.fontSize};
    font-weight: ${(props) => props.theme.typography.h2.fontWeight};
  }

  p {
    margin: 0.3rem 0;
    font-size: ${(props) => props.theme.typography.body2.fontSize};
    color: ${(props) => props.theme.palette.text.secondary};
  }

  .message-content {
    margin: 0.3rem 0;
    font-size: ${(props) => props.theme.typography.body1.fontSize};
    color: ${(props) => props.theme.palette.text.primary};
  }

  .message-footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    margin-top: 1rem;

    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: ${(props) => props.theme.styles.button.borderRadius};
      object-fit: cover;
    }

    span {
      font-size: ${(props) => props.theme.typography.body1.fontSize};
      font-weight: bold;
      color: ${(props) => props.theme.palette.text.primary};
    }
  }

  .status-icons {
    position: absolute;
    bottom: 1rem;
    right: 1rem;

    svg {
      font-size: 1.5rem;
      transition: color 0.3s ease;
    }

    .unread {
      color: #E23428;
    }

    .read {
      color: ${(props) => props.theme.palette.text.secondary};
    }
  }
`;

export const StyledMessagesCard = styled.div`
  background: ${(props) => props.theme.palette.background.paper};
  padding: 1.5rem;
  border-radius: ${(props) => props.theme.styles.button.borderRadius};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

export const NavigationButton = styled.button`
  background: ${(props) => props.theme.palette.secondary.main};
  border: none;
  color: white;
  border-radius: ${(props) => props.theme.styles.button.borderRadius};
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.styles.button.hover.backgroundColor};
    color: ${(props) => props.theme.styles.button.hover.color};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(19, 88, 70, 0.3);
  }
`;
