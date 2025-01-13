import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { label: "Dashboard", path: "/" },
    { label: "Bookings", path: "/bookings" },
    { label: "Rooms", path: "/rooms" },
    { label: "Users", path: "/users" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="sidebar">
      <h2>Hotel Dashboard</h2>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export {Sidebar};
