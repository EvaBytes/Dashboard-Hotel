import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../redux/thunks/usersThunks.js";
import { format, parseISO, isValid } from "date-fns";
import { MdOutlinePhone, MdOutlineMailOutline } from "react-icons/md";
import {GuestDetailsContainer,GuestInfoCard,GuestImage,GuestHeader,GuestNameDetails,GuestActions,GuestInfoSection,StatusBadge,Divider} from "../../styles/GuestDetailsStyles.js";

const UserDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (!currentUser || currentUser.employeeId !== employeeId) {
      dispatch(fetchUserById(employeeId));
    }
  }, [dispatch, employeeId, currentUser]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentUser) return <p>User details not found.</p>;

  const { name, description, contact, status, startDate, photo } = currentUser;

  const formattedStartDate =
    startDate && isValid(parseISO(startDate))
      ? format(parseISO(startDate), "MMM dd, yyyy")
      : "N/A";

  return (
    <GuestDetailsContainer>
      <GuestInfoCard>
        <GuestHeader>
          <GuestImage
            src={photo || "default-user-image.png"}
            alt={name}
          />
          <GuestNameDetails>
            <h2>{name}</h2>
            <p>ID: {employeeId}</p>
          </GuestNameDetails>
        </GuestHeader>
        <GuestActions>
          <button>
            <MdOutlinePhone /> Call
          </button>
          <button>
            <MdOutlineMailOutline /> Send Message
          </button>
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
            <strong>Status:</strong>
            <StatusBadge $status={status}>{status}</StatusBadge>
          </p>
          <p>
            <strong>Started:</strong> {formattedStartDate}
          </p>
        </GuestInfoSection>
      </GuestInfoCard>
      <button
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </GuestDetailsContainer>
  );
};

export { UserDetails };
