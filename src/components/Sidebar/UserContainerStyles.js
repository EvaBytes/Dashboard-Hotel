import { styled } from "@mui/material/styles";
import { Box, Button, Avatar } from "@mui/material";

export const UserContainer = styled(Box)(({ theme }) => ({
  padding: "1.5rem 2rem",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginTop: ".7rem",
}));

export const UserAvatar = styled(Avatar)({
  width: "5rem",
  height: "5rem",
  borderRadius: "50%",
  margin: "0 auto",
  marginBottom: ".7rem",
});

export const UserInfo = styled(Box)({
  marginBottom: ".7rem",
});

export const UserName = styled("p")(({ theme }) => ({
  color: "#393939",
  fontSize: "1rem",
  fontWeight: "bold",
  margin: 0,
}));

export const UserEmail = styled("p")(({ theme }) => ({
  color: "#B2B2B2",
  fontSize: ".8rem",
  margin: 0,
}));

export const EditButton = styled(Button)({
  backgroundColor: "#EBF1EF", 
  color: "#333333",
  padding: ".5rem .8rem",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#799283", 
  },
});





