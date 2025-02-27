import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {BackgroundContainer,StyledAuthContainer,StyledAuthButton,StyledSubtitle,Typography,Alert,CircularProgress,StyledTextField} from "../styles/loginStyles";
import { API_URL } from "../config/index";

const Login = () => {
  const [email, setEmail] = useState("user1@example.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    const newErrors: { email?: string; password?: string } = {};
    setErrors({});

    if (!validateEmail(email)) {
      newErrors.email = "Email is not valid.";
    }
    if (password.length < 6) {
      newErrors.password = "The password must have at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        if (data.token) {
          login({
            email,
            password,
          }, data.token);         
          navigate("/");
        } else {
          setErrors({ password: "No token received. Please try again." });
        }
      } else {
        setErrors({ password: "Invalid credentials. Please try again." });
      }
    } catch (error) {
      console.error("Error en la solicitud de login:", error);
      setErrors({ password: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundContainer>
      <StyledAuthContainer>
        <Typography size="2rem">Welcome</Typography>
        <StyledSubtitle>Please, insert your Login Data</StyledSubtitle>

        {errors.email && <Alert type="error">{errors.email}</Alert>}
        {errors.password && <Alert type="error">{errors.password}</Alert>}

        <StyledTextField
          type="email"
          placeholder="Email"
          data-cy="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          type="password"
          placeholder="Password"
          data-cy="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <StyledAuthButton
          data-cy="login-button"
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? <CircularProgress /> : "Login"}
        </StyledAuthButton>
      </StyledAuthContainer>
    </BackgroundContainer>
  );
};

export { Login };
