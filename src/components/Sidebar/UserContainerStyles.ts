import styled from "styled-components";

export const UserContainer = styled.div`
  padding: 1.5rem 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 0.7rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const UserAvatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 0.7rem;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  margin-bottom: 0.7rem;
`;

export const UserName = styled.p`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  margin: 0 0 0.2rem 0;
`;

export const UserEmail = styled.p`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: .8rem;
  margin: 0;
`;

export const EditButton = styled.button`
background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: bold;
  padding: 0.8rem 1.5rem;
  border-radius: ${({ theme }) => theme.styles.button.borderRadius};
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.styles.button.hover.backgroundColor};
    color: ${({ theme }) => theme.styles.button.hover.color};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.styles.button.disabled.backgroundColor};
    color: ${({ theme }) => theme.styles.button.disabled.color};
  }
`;

export const SaveButton = styled(EditButton)`
  color: white;
  background-color: ${({ theme }) => theme.palette.secondary.main};

  &:hover {
    background-color: ${({ theme }) => theme.styles.button.hover.backgroundColor};
  }
`;

export const CancelButton = styled(EditButton)`
  background-color: ${({ theme }) => theme.palette.text.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.styles.button.hover.backgroundColor};
  }
`;

export const InputField = styled.input`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  margin-bottom: 0.7rem;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    border-color: ${({ theme }) => theme.palette.secondary.main};
    outline: none;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalButtonContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
`;