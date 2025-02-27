import React, { FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, editUser } from "../../redux/thunks/usersThunks";
import { selectCurrentUser, selectUsersStatus, selectError } from "../../redux/slices/usersSlice";
import {FormContainer,FormGroup,Label,Input,TextArea,SubmitButton,BackButton} from "../../styles/EditBooking";
import { AppDispatch } from "../../redux/store";
import { EditPayload, EditUserPayload } from "../../interfaces/users/UsersState";

export const EditUser = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectUsersStatus) === "pending";
  const error = useSelector(selectError);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [startDate, setStartDate] = useState<string>("");

  useEffect(() => {
    if (employeeId) {
      dispatch(fetchUserById(employeeId));
    }
  }, [dispatch, employeeId]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.description || "");
      setContact(currentUser.contact || "");
      setStatus(currentUser.status || "ACTIVE");
      setStartDate(
        currentUser.startDate
          ? new Date(currentUser.startDate).toISOString().slice(0, 19)
          : ""
      );
    }
  }, [currentUser]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedUser: EditPayload = {
      employeeId: employeeId!,
      name,
      description,
      contact,
      status,
      startDate,
    };

    const userToUpdate: EditUserPayload = {
      ...currentUser!,
      ...updatedUser,
    };

    dispatch(editUser(userToUpdate))
      .unwrap()
      .then(() => navigate(`/user-details/${employeeId}`))
      .catch((err) => console.error("Error updating user: ", err));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <FormContainer>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="contact">Contact</Label>
          <Input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "ACTIVE" | "INACTIVE")
            }
            style={{
              width: "100%",
              padding: ".6rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="startDate">Start Date and Time</Label>
          <Input
            id="startDate"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormGroup>

        <SubmitButton type="submit">Save</SubmitButton>
        <BackButton type="button" onClick={() => navigate(-1)}>
          Cancel
        </BackButton>
      </form>
    </FormContainer>
  );
};
