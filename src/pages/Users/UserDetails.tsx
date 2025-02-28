import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../redux/thunks/usersThunks";
import { selectCurrentUser, selectUsersStatus, selectError } from "../../redux/slices/usersSlice";
import { format, isValid, parse } from "date-fns";
import { MdOutlinePhone, MdOutlineMailOutline } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { GuestDetailsContainer, UsersInfoCard, GuestImage, GuestHeader, GuestNameDetails, GuestActions, GuestInfoSection, StatusBadge, Divider, ActionButton, ModifyButton } from "../../styles/GuestDetailsStyles";
import { AppDispatch } from "../../redux/store";

const UserDetails = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectUsersStatus) === "pending";
  const error = useSelector(selectError);

  useEffect(() => {
    if (employeeId && (!currentUser || currentUser.employeeId !== employeeId)) {
      dispatch(fetchUserById(employeeId));
    }
  }, [dispatch, employeeId, currentUser]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentUser) return <p>User details not found.</p>;

  const { name, description, contact, status, startDate, photo } = currentUser;

  const parsedDate = startDate
    ? parse(startDate, "dd/MM/yyyy", new Date()) 
    : null;

  const displayDate = parsedDate && isValid(parsedDate)
    ? format(parsedDate, "MMM dd, yyyy") 
    : "N/A";

  console.log("Fecha original:", startDate); 
  console.log("Fecha parseada:", parsedDate); 
  console.log("Fecha formateada:", displayDate); 

  return (
    <GuestDetailsContainer>
      <UsersInfoCard>
        <GuestHeader>
          <GuestImage src={photo || "/Profile1.png"} alt={name} />
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
          <h4>
            <strong>Description:</strong> {description}
          </h4>
          <h4>
            <strong>Contact:</strong> {contact}
          </h4>
        </GuestInfoSection>
        <Divider />
        <GuestInfoSection>
          <h4>
            <strong>Status:</strong>{" "}
            <StatusBadge $status={status}>{status}</StatusBadge>
          </h4>
          <h4>
            <strong>Started:</strong> {displayDate}
          </h4>
        </GuestInfoSection>
      </UsersInfoCard>
    </GuestDetailsContainer>
  );
};

export { UserDetails };