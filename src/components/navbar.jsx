import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Dashboard</h1>
      </div>
      <div className="navbar-right">
        <button>Notifications</button>
        <button>Profile</button>
      </div>
    </nav>
  );
};

export {Navbar};
