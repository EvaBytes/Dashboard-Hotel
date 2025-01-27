import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../redux/thunks/usersThunk.js"; 
import { format } from "date-fns";
import { MdOutlinePhone, MdOutlineMailOutline } from "react-icons/md";
import {GuestDetailsContainer,GuestInfoCard,GuestImage,GuestHeader,GuestNameDetails,GuestActions,GuestInfoSection,StatusBadge,Divider} from "../../styles/GuestDetailsStyles";

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentUser) return <p>User details not found.</p>;

  const { name, description, contact, status, started } = currentUser;

  return (
    <GuestDetailsContainer>
      <GuestInfoCard>
        <GuestHeader>
          <GuestImage src={currentUser.image || "default-user-image.png"} alt={name} />
          <GuestNameDetails>
            <h2>{name}</h2>
            <p>ID: {userId}</p>
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
            <strong>Started:</strong> {format(new Date(started), "MMM dd, yyyy")}
          </p>
        </GuestInfoSection>
      </GuestInfoCard>
    </GuestDetailsContainer>
  );
};

export {UserDetails};