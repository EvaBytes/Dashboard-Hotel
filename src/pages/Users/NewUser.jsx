import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; 
import { createUser } from "../../redux/thunks/usersThunk.js";
import {FormContainer,FormGroup,Label,Input,SubmitButton,BackButton} from "../../styles/NewUserStyles.js";

export const NewUser = () => {

  const [userData, setUserData] = useState({
    photo: "",
    fullName: "",
    userId: "",
    email: "",
    startDate: "",
    description: "",
    contact: "",
    status: "ACTIVE",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(userData))
      .unwrap() 
      .then(() => {
        alert("New user added successfully!");
        navigate("/users"); 
      })
      .catch((error) => {
        alert(`Error: ${error}`); 
      });
  };

  return (
    <FormContainer>
      <h2>New User</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Upload Photo</Label>
          <Input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            value={userData.fullName}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>ID User</Label>
          <Input
            type="text"
            name="userId"
            placeholder="Enter user ID"
            value={userData.userId}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Start Date</Label>
          <Input
            type="date"
            name="startDate"
            value={userData.startDate}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            placeholder="Enter job description"
            value={userData.description}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Contact</Label>
          <Input
            type="text"
            name="contact"
            placeholder="Enter phone number"
            value={userData.contact}
            onChange={handleInputChange}
          />
        </FormGroup>

        <SubmitButton type="submit">Save User</SubmitButton>
        <BackButton type="button" onClick={() => navigate("/users")}>
          Cancel
        </BackButton>
      </form>
    </FormContainer>
  );
};