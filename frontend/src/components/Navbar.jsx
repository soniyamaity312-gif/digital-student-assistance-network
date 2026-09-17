import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <Link className="brand" to={user ? `/${user.role}/dashboard` : "/login"}>DSAN</Link>
      <div className="nav-right">
        {user && <><span>{user.name}</span><span className="badge">{user.role}</span>
        <button className="btn btn-outline" onClick={() => { logout(); navigate("/login"); }}>Logout</button></>}
      </div>
    </header>
  );
}