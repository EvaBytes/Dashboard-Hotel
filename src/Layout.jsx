import React from "react";
import { Routes, Route } from "react-router-dom";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {Navbar} from "./components/Navbar";
import {Dashboard} from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import {Rooms} from "./pages/Rooms";
import {Users} from "./pages/Users";
import Login from "./verification/Login";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export { Layout };
