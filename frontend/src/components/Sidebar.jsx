import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = {
  student: [
    ["/student/dashboard", "Dashboard"],
    ["/student/request", "New Request"],
    ["/student/requests", "My Requests"],
    ["/student/notices", "Notices"],
    ["/student/profile", "Profile"]
  ],
  staff: [
    ["/staff/dashboard", "Dashboard"],
    ["/staff/requests", "Assigned Requests"],
    ["/staff/profile", "Profile"]
  ],
  admin: [
    ["/admin/dashboard", "Dashboard"],
    ["/admin/students", "Students"],
    ["/admin/staff", "Staff"],
    ["/admin/requests", "Requests"],
    ["/admin/notices", "Notices"],
    ["/admin/categories", "Categories"]
  ]
};

export default function Sidebar() {
  const { user } = useAuth();
  if (!user) return null;
  return <aside className="sidebar">
    <h3>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel</h3>
    <nav>{links[user.role].map(([to, label]) =>
      <NavLink key={to} to={to}>{label}</NavLink>
    )}</nav>
  </aside>;
}