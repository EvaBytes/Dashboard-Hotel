import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { BackgroundContainer, StyledAuthContainer, StyledAuthButton, StyledSubtitle, Typography, Alert, CircularProgress, StyledTextField } from "../styles/loginStyles";

const Login = () => {
  const [email, setEmail] = useState("user@testing.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
      if (email === "user@testing.com" && password === "123456") {
        dispatch(
          login({
            name: "Eva Sevillano",
            email: "user@testing.com",
            image: "src/assets/img/profile.jpeg",
          })
        );
      } else {
        setErrors({
          password: "Credenciales inválidas. Inténtalo nuevamente.",
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <StyledAuthButton onClick={handleLogin} disabled={loading || !email || !password}>
          {loading ? <CircularProgress /> : "Login"}
        </StyledAuthButton>
      </StyledAuthContainer>
    </BackgroundContainer>
  );
};

export { Login };
