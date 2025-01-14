import { styled } from "@mui/material/styles";
import { Box, TextField, Button, Typography, } from "@mui/material";

export const BackgroundContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundImage: `url("src/assets/img/Login.png")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  padding: theme.spacing(2), 
}));

export const StyledAuthContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  padding: "1.2rem", 
  margin: "1rem",
  borderRadius: "10px", 
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
  textAlign: "center",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "90%",
  borderRadius: "10px", 
  backgroundColor: "#FFFFFF",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#FFFFFF",
    },
    "&:hover fieldset": {
      borderColor: "#00000014",
    },

  },
}));

export const StyledAuthButton = styled(Button)(({ theme }) => ({
  width: "7.8rem", 
  padding: "1rem",
  marginTop: ".3rem",
  fontWeight: "bold",
  backgroundColor: "#135846",
  color: "#FFFFFF",
  borderRadius: "8px", 
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
}));

export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "#A10035",
  marginTop: ".2rem", 
  marginBottom: "1rem", 
}));
