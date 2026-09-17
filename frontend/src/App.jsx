import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import StaffLogin from "./pages/StaffLogin.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Register from "./pages/Register.jsx";

import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import CreateRequest from "./pages/student/CreateRequest.jsx";
import StudentRequests from "./pages/student/StudentRequests.jsx";
import StudentRequestDetails from "./pages/student/StudentRequestDetails.jsx";
import StudentProfile from "./pages/student/StudentProfile.jsx";
import StudentNotices from "./pages/student/StudentNotices.jsx";

import StaffDashboard from "./pages/staff/StaffDashboard.jsx";
import StaffRequests from "./pages/staff/StaffRequests.jsx";
import StaffRequestDetails from "./pages/staff/StaffRequestDetails.jsx";
import StaffProfile from "./pages/staff/StaffProfile.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageStudents from "./pages/admin/ManageStudents.jsx";
import ManageStaff from "./pages/admin/ManageStaff.jsx";
import ManageRequests from "./pages/admin/ManageRequests.jsx";
import ManageNotices from "./pages/admin/ManageNotices.jsx";
import ManageCategories from "./pages/admin/ManageCategories.jsx";


const P = ({ role, children }) => (
  <ProtectedRoute allowedRoles={[role]}>
    {children}
  </ProtectedRoute>
);


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Portal Selection */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Separate Login Pages */}
        <Route
          path="/student/login"
          element={<Login />}
        />

        <Route
          path="/staff/login"
          element={<StaffLogin />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================= STUDENT ================= */}

        <Route
          path="/student/dashboard"
          element={
            <P role="student">
              <StudentDashboard />
            </P>
          }
        />

        <Route
          path="/student/request"
          element={
            <P role="student">
              <CreateRequest />
            </P>
          }
        />

        <Route
          path="/student/requests"
          element={
            <P role="student">
              <StudentRequests />
            </P>
          }
        />

        <Route
          path="/student/request/:id"
          element={
            <P role="student">
              <StudentRequestDetails />
            </P>
          }
        />

        <Route
          path="/student/profile"
          element={
            <P role="student">
              <StudentProfile />
            </P>
          }
        />

        <Route
          path="/student/notices"
          element={
            <P role="student">
              <StudentNotices />
            </P>
          }
        />


        {/* ================= STAFF ================= */}

        <Route
          path="/staff/dashboard"
          element={
            <P role="staff">
              <StaffDashboard />
            </P>
          }
        />

        <Route
          path="/staff/requests"
          element={
            <P role="staff">
              <StaffRequests />
            </P>
          }
        />

        <Route
          path="/staff/request/:id"
          element={
            <P role="staff">
              <StaffRequestDetails />
            </P>
          }
        />

        <Route
          path="/staff/profile"
          element={
            <P role="staff">
              <StaffProfile />
            </P>
          }
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <P role="admin">
              <AdminDashboard />
            </P>
          }
        />

        <Route
          path="/admin/students"
          element={
            <P role="admin">
              <ManageStudents />
            </P>
          }
        />

        <Route
          path="/admin/staff"
          element={
            <P role="admin">
              <ManageStaff />
            </P>
          }
        />

        <Route
          path="/admin/requests"
          element={
            <P role="admin">
              <ManageRequests />
            </P>
          }
        />

        <Route
          path="/admin/notices"
          element={
            <P role="admin">
              <ManageNotices />
            </P>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <P role="admin">
              <ManageCategories />
            </P>
          }
        />


        {/* Any unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}