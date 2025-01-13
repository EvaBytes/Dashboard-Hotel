import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    const newErrors = {};
    setErrors({}); 

    if (!validateEmail(email)) {
      newErrors.email = "El correo electrónico no es válido.";
    }
    if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === "admin@example.com" && password === "123456") {
        localStorage.setItem("authToken", "fakeToken");
        navigate("/dashboard");
      } else {
        setErrors({ password: "Credenciales inválidas. Inténtalo nuevamente." });
      }
    }, 1500);
  };

  const formStyles = {
    mb: 2,
    width: "300px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh", 
        backgroundColor: "background.default",
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" mb={3}>
        Login
      </Typography>

      {errors.email && (
        <Alert severity="error" sx={formStyles}>
          {errors.email}
        </Alert>
      )}
      {errors.password && (
        <Alert severity="error" sx={formStyles}>
          {errors.password}
        </Alert>
      )}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        sx={formStyles}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        sx={formStyles}
      />

      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={loading}
        sx={{ width: "125px", padding: "10px" }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </Box>
  );
};

export { Login };
