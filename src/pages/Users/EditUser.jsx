import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, editUser } from "../../redux/thunks/usersThunks.js";
import {FormContainer,FormGroup,Label,Input,TextArea,SubmitButton,BackButton} from "../../styles/EditBooking.js"; 

export const EditUser = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, loading, error } = useSelector((state) => state.users);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchUserById(employeeId));
  }, [dispatch, employeeId]);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.description || "");
      setContact(currentUser.contact || "");
      setStatus(currentUser.status || "ACTIVE");
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      employeeId,
      name,
      description,
      contact,
      status,
    };

    dispatch(editUser(updatedUser))
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
            rows="3"
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
            onChange={(e) => setStatus(e.target.value)}
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
        <SubmitButton type="submit">Save</SubmitButton>
        <BackButton type="button" onClick={() => navigate(-1)}>
          Cancel
        </BackButton>
      </form>
    </FormContainer>
  );
};

export default EditUser;
