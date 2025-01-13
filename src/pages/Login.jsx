import React from "react";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    alert("Login successful!");
    // Aquí puedes agregar lógica adicional para autenticación.
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export {Login};
