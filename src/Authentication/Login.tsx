import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.js";
import {BackgroundContainer,StyledAuthContainer,StyledAuthButton,StyledSubtitle,Typography,Alert,CircularProgress,StyledTextField} from "../styles/loginStyles.js";

const Login = () => {
  const [email, setEmail] = useState("user@testing.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    const newErrors = {};
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

    setTimeout(() => {
      setLoading(false);
      if (email === "user@testing.com" && password === "123456") {
        login({
          name: "Eva Sevillano",
          email: "user@testing.com",
          image: "src/assets/img/profile.jpeg",
        });
        navigate("/");
      } else {
        setErrors({
          password: "Invalid credentials. Please try again.",
        });
      }
    }, 1500);
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
