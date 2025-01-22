import React, { useState } from "react";
import {UserContainer, UserAvatar,UserInfo,UserName,UserEmail,EditButton,SaveButton,CancelButton,InputField,ModalBackdrop,ModalContent,ModalTitle,ModalButtonContainer} from "./UserContainerStyles";

const UserContainerComponent = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user.name,
    email: user.email,
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedUser({ name: user.name, email: user.email });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(editedUser);
    }
  };

  return (
    <>
      <UserContainer>
        <UserAvatar alt={user.name} src={user.image} />

        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserInfo>

        <EditButton onClick={handleEditToggle}>Editar</EditButton>
      </UserContainer>

      {isEditing && (
        <ModalBackdrop>
          <ModalContent>
            <ModalTitle>Edit Your User</ModalTitle>

            <InputField
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              placeholder="Nombre"
            />
            <InputField
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
            />

            <ModalButtonContainer>
              <SaveButton onClick={handleSave}>Save</SaveButton>
              <CancelButton onClick={handleEditToggle}>Cancel</CancelButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
};

export { UserContainerComponent as UserContainer };
