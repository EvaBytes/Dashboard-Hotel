import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Typography,Alert,CircularProgress,ThemeProvider,} from "@mui/material";
import {BackgroundContainer,StyledAuthContainer,StyledAuthButton,StyledTextField,StyledSubtitle,} from "../assets/authStyles";
import { theme } from "../assets/theme";

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
        setErrors({
          password: "Credenciales inválidas. Inténtalo nuevamente.",
        });
      }
    }, 1500);
  };

  return (
    <ThemeProvider theme={theme}>
      <BackgroundContainer>
        <StyledAuthContainer>
          <Typography variant="h4" component="h1" mb={1}>
            Welcome
          </Typography>
          <StyledSubtitle>Please, insert your Login Data</StyledSubtitle>

          {errors.email && (
            <Alert severity="error" style={{ marginBottom: "16px", width: "100%" }}>
              {errors.email}
            </Alert>
          )}
          {errors.password && (
            <Alert severity="error" style={{ marginBottom: "16px", width: "100%" }}>
              {errors.password}
            </Alert>
          )}

          <StyledTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            fullWidth
            margin="normal"
          />
          <StyledTextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            fullWidth
            margin="normal"
          />

          <StyledAuthButton
            onClick={handleLogin}
            disabled={loading || !email || !password}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </StyledAuthButton>
        </StyledAuthContainer>
      </BackgroundContainer>
    </ThemeProvider>
  );
};

export { Login };
