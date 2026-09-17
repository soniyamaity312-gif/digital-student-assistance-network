import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="auth-page">
      <div className="portal-container">

        <div className="portal-header">
          <h1>Digital Student Assistance Network</h1>
          <p className="muted">
            Select your portal to continue
          </p>
        </div>

        <div className="portal-cards">

          {/* Student */}
          <div className="portal-card">
            <div className="portal-icon">🎓</div>

            <h2>Student</h2>

            <p>
              Raise complaints, track your requests,
              and get assistance from the concerned department.
            </p>

            <Link
              to="/student/login"
              className="btn btn-primary full"
            >
              Student Login
            </Link>

            <p className="portal-register">
              New student?{" "}
              <Link to="/register">
                Create an account
              </Link>
            </p>
          </div>

          {/* Staff */}
          <div className="portal-card">
            <div className="portal-icon">👨‍🏫</div>

            <h2>Staff</h2>

            <p>
              Manage student complaints, respond to requests,
              and update complaint status.
            </p>

            <Link
              to="/staff/login"
              className="btn btn-primary full"
            >
              Staff Login
            </Link>
          </div>

          {/* Admin */}
          <div className="portal-card">
            <div className="portal-icon">🛡️</div>

            <h2>Admin</h2>

            <p>
              Manage students, staff, complaints,
              departments and system activities.
            </p>

            <Link
              to="/admin/login"
              className="btn btn-primary full"
            >
              Admin Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}