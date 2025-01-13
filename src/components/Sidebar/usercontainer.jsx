import React from "react";
import {UserContainer,UserAvatar,UserInfo,UserName,UserEmail,EditButton,} from "./UserContainerStyles";

const UserContainerComponent = ({ user }) => {
  return (
    <UserContainer>
      <UserAvatar alt={user.name} src={user.image} />

      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
      </UserInfo>

      <EditButton>Editar</EditButton>
    </UserContainer>
  );
};

export { UserContainerComponent as UserContainer };
