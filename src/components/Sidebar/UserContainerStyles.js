import { styled } from "@mui/material/styles";
import { Box, Button, Avatar } from "@mui/material";

export const UserContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginTop: "20px",
}));

export const UserAvatar = styled(Avatar)({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  margin: "0 auto",
  marginBottom: "10px",
});

export const UserInfo = styled(Box)({
  marginBottom: "10px",
});

export const UserName = styled("p")(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "16px",
  fontWeight: "bold",
  margin: 0,
}));

export const UserEmail = styled("p")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "14px",
  margin: 0,
}));

export const EditButton = styled(Button)({
  backgroundColor: "#EBF1EF", 
  color: "#333333",
  padding: "8px 12px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#799283", 
  },
});





