import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/thunks/usersThunks";
import { AppDispatch } from "../../redux/store";
import { NewUserPayload } from "../../interfaces/users/UsersState";
import Swal from "sweetalert2";
import { parseISO, format, isValid } from "date-fns";
import {FormContainer,FormGroup,Label,Input,SubmitButton,BackButton, Select} from "../../styles/NewUserStyles";

export const NewUser = () => {
  const [userData, setUserData] = useState<NewUserPayload>({
    name: "",
    photo: "",
    fullName: "",
    employeeId: "",
    email: "",
    startDate: "",
    description: "",
    contact: "",
    status: "ACTIVE",
  });

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
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setUserData((prev) => ({ ...prev, photo: reader.result as string | null}));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedStartDate = parseISO(userData.startDate);
    const newErrors = {
      ...errors,
      startDate: !isValid(formattedStartDate),
    };

    const hasErrors = Object.values(newErrors).some((val) => val);

    if (hasErrors) {
      setErrors(newErrors);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields before saving.",
      });
      return;
    }

    const formattedUserData = {
      ...userData,
      photo: userData.photo ?? "",
      startDate: userData.startDate
        ? format(parseISO(userData.startDate), "yyyy-MM-dd")
        : "",
    };

    dispatch(createUser({ ...formattedUserData, name: userData.fullName }))
      .unwrap()
      .then(() => {
        Swal.fire("Success!", "User created successfully!", "success");
        navigate("/users");
      })
      .catch((error: string) => {
        Swal.fire("Error", `Failed to create user: ${error}`, "error");
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
            style={{ border: errors.photo ? "1px solid red" : undefined }}
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
            name="employeeId"
            placeholder="Enter user ID"
            value={userData.employeeId}
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
          <Label>Contact</Label>
          <Input
            type="text"
            name="contact"
            placeholder="Enter phone number"
            value={userData.contact}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <Select
            name="description"
            value={userData.description}
            onChange={handleInputChange}
          >
            <option value="">Select Job Role</option>
            <option value="Front Desk Receptionist">
              Front Desk Receptionist
            </option>
            <option value="Chef de Cuisine">Chef de Cuisine</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Concierge">Concierge</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Status</Label>
          <Select
            name="status"
            value={userData.status}
            onChange={handleInputChange}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </Select>
        </FormGroup>

        <SubmitButton type="submit">Save User</SubmitButton>
        <BackButton type="button" onClick={() => navigate("/users")}>
          Cancel
        </BackButton>
      </form>
    </FormContainer>
  );
};
