import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/thunks/usersThunks.js";
import {FormContainer,FormGroup,Label,Input,SubmitButton,BackButton} from "../../styles/NewUserStyles.js";

export const NewUser = () => {
  const [userData, setUserData] = useState({
    photo: "",
    fullName: "",
    employeeId: "",
    email: "",
    startDate: "",
    description: "",
    contact: "",
    status: "ACTIVE",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    photo: false,
    fullName: false,
    employeeId: false,
    email: false,
    startDate: false,
    description: false,
    contact: false,
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

    const newErrors = {
      photo: !userData.photo, 
      fullName: !userData.fullName.trim(),
      employeeId: !userData.employeeId.trim(),
      email: !userData.email.trim(),
      startDate: !userData.startDate.trim(),
      description: !userData.description.trim(),
      contact: !userData.contact.trim(),
    };

    const hasErrors = Object.values(newErrors).some((val) => val === true);

    if (hasErrors) {
      setErrors(newErrors);
      setErrorMessage("Please fill in all required fields before saving.");
      return;
    }

    setErrors({
      photo: false,
      fullName: false,
      employeeId: false,
      email: false,
      startDate: false,
      description: false,
      contact: false,
    });
    setErrorMessage("");

    dispatch(createUser(userData))
      .unwrap()
      .then(() => {
        alert("¡Usuario creado con éxito!");
        navigate("/users");
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  };

  return (
    <FormContainer>
      <h2>New User</h2>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Upload Photo</Label>
          <Input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{
              border: errors.photo ? "1px solid red" : undefined,
            }}
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
            style={{
              border: errors.fullName ? "1px solid red" : undefined,
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>ID User</Label>
          <Input
            type="text"
            name="employeeId"
            placeholder="Enter user ID"
            value={userData.employeeId}
            onChange={handleInputChange}
            style={{
              border: errors.employeeId ? "1px solid red" : undefined,
            }}
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
            style={{
              border: errors.email ? "1px solid red" : undefined,
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Start Date</Label>
          <Input
            type="date"
            name="startDate"
            value={userData.startDate}
            onChange={handleInputChange}
            style={{
              border: errors.startDate ? "1px solid red" : undefined,
            }}
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
            style={{
              border: errors.description ? "1px solid red" : undefined,
            }}
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
            style={{
              border: errors.contact ? "1px solid red" : undefined,
            }}
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
