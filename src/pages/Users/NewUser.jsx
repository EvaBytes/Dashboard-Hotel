import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FormContainer,FormGroup,Label,Input,SubmitButton, BackButton} from "../../styles/NewUserStyles.js";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("New user added successfully!");
    navigate("/users"); 
  };

  return (
    <FormContainer>
      <h2>New User</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Photo URL</Label>
          <Input
            type="text"
            name="photo"
            placeholder="https://put-your-pretty-face-url-here.com"
            value={userData.photo}
            onChange={handleInputChange}
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
