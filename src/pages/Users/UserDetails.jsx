import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../redux/thunks/usersThunks.js";
import { format, isValid } from "date-fns";
import { MdOutlinePhone, MdOutlineMailOutline } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import {GuestDetailsContainer,UsersInfoCard,GuestImage,GuestHeader,GuestNameDetails,GuestActions,GuestInfoSection,StatusBadge,Divider,ActionButton,ModifyButton} from "../../styles/GuestDetailsStyles.js";

const UserDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    console.log("Employee ID desde URL:", employeeId);
    console.log("Usuarios en localStorage:", JSON.parse(localStorage.getItem("users")));

    if (!currentUser || currentUser.employeeId !== employeeId) {
      dispatch(fetchUserById(employeeId));
    }
  }, [dispatch, employeeId, currentUser]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentUser) return <p>User details not found.</p>;

  const { name, description, contact, status, startDate, photo } = currentUser;
  console.log("Photo URL:", photo);

  const formattedStartDate = startDate && isValid(new Date(startDate))
  ? format(new Date(startDate), "MMM dd, yyyy")
  : "N/A";

  return (
    <GuestDetailsContainer>
      <UsersInfoCard>
        <GuestHeader>
          <GuestImage src={photo || "default-user-image.png"} alt={name} />
          <GuestNameDetails>
            <h2>{name}</h2>
            <h4>ID: {employeeId}</h4>
          </GuestNameDetails>
        </GuestHeader>

        <GuestActions>
          <ActionButton>
            <MdOutlinePhone /> Call
          </ActionButton>
          <ActionButton>
            <MdOutlineMailOutline /> Send Message
          </ActionButton>
          <ModifyButton onClick={() => navigate(`/edit-user/${employeeId}`)}>
            <FaPencilAlt /> Edit
          </ModifyButton>
        </GuestActions>

        <Divider />
        <GuestInfoSection>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Contact:</strong> {contact}
          </p>
        </GuestInfoSection>
        <Divider />
        <GuestInfoSection>
          <p>
            <strong>Status:</strong>{" "}
            <StatusBadge $status={status}>{status}</StatusBadge>
          </p>
          <p>
            <strong>Started:</strong> {formattedStartDate}
          </p>
        </GuestInfoSection>
      </UsersInfoCard>
    </GuestDetailsContainer>
  );
};

export { UserDetails };