import styled from "styled-components";

export const UserContainer = styled.div`
  padding: 1.5rem 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 0.7rem;
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
  color: #393939;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

export const UserEmail = styled.p`
  color: #b2b2b2;
  font-size: 0.8rem;
  margin: 0;
`;

export const EditButton = styled.button`
  background-color: #ebf1ef;
  color: #333333;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #799283;
    color: #ffffff;
  }
`;
