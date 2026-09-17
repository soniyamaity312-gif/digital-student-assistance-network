import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = {
  student: [
    ["/student/dashboard", "🎓", "Dashboard"],
    ["/student/request", "➕", "New Request"],
    ["/student/requests", "📋", "My Requests"],
    ["/student/notices", "📢", "Notices"],
    ["/student/profile", "👤", "Profile"]
  ],

  staff: [
    ["/staff/dashboard", "📊", "Dashboard"],
    ["/staff/requests", "📋", "Assigned Requests"],
    ["/staff/profile", "👤", "Profile"]
  ],

  admin: [
    ["/admin/dashboard", "📊", "Dashboard"],
    ["/admin/students", "🎓", "Students"],
    ["/admin/staff", "👨‍🏫", "Staff"],
    ["/admin/requests", "📋", "Complaints"],
    ["/admin/notices", "📢", "Notices"],
    ["/admin/categories", "🏷️", "Categories"]
  ]
};

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  const role = user.role;

  return (
    <aside className="sidebar">

      <div className="sidebar-title">
        <div className="sidebar-role-icon">
          {role === "admin"
            ? "🛡️"
            : role === "staff"
            ? "👨‍🏫"
            : "🎓"}
        </div>

        <div>
          <h3>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </h3>

          <span>Portal</span>
        </div>
      </div>

      <nav>
        {links[role]?.map(([to, icon, label]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <span className="sidebar-icon">
              {icon}
            </span>

            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}