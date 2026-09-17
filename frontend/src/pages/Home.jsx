import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">

      <header className="home-header">
        <div className="home-brand">
          <div className="home-logo">DS</div>
          <span>Digital Student Assistance Network</span>
        </div>

        <Link to="/student/login" className="home-login">
          Student Login
        </Link>
      </header>


      <main className="home-main">

        <section className="hero-section">

          <div className="hero-content">
            <span className="hero-label">
              STUDENT SUPPORT PLATFORM
            </span>

            <h1>
              One platform for
              <br />
              <span>student assistance.</span>
            </h1>

            <p>
              Connect students, staff and administration
              through a centralized complaint and assistance
              management system.
            </p>
          </div>

        </section>


        <section className="portal-section">

          <div className="portal-heading">
            <h2>Choose Your Portal</h2>

            <p>
              Select the portal according to your role.
            </p>
          </div>


          <div className="portal-cards">

            {/* STUDENT */}

            <div className="portal-card">

              <div className="portal-card-top">
                <div className="portal-icon student-icon">
                  🎓
                </div>

                <span className="portal-number">
                  01
                </span>
              </div>

              <h3>Student Portal</h3>

              <p>
                Submit complaints, track requests,
                view notices and communicate with
                the concerned department.
              </p>

              <Link
                to="/student/login"
                className="portal-button"
              >
                Student Login
                <span>→</span>
              </Link>

              <div className="portal-features">
                <span>✓ Raise Complaint</span>
                <span>✓ Track Status</span>
                <span>✓ View Notices</span>
              </div>

            </div>


            {/* STAFF */}

            <div className="portal-card">

              <div className="portal-card-top">
                <div className="portal-icon staff-icon">
                  👨‍🏫
                </div>

                <span className="portal-number">
                  02
                </span>
              </div>

              <h3>Staff Portal</h3>

              <p>
                Manage departmental complaints,
                respond to students and update
                complaint progress.
              </p>

              <Link
                to="/staff/login"
                className="portal-button"
              >
                Staff Login
                <span>→</span>
              </Link>

              <div className="portal-features">
                <span>✓ Assigned Complaints</span>
                <span>✓ Student Replies</span>
                <span>✓ Status Updates</span>
              </div>

            </div>


            {/* ADMIN */}

            <div className="portal-card">

              <div className="portal-card-top">
                <div className="portal-icon admin-icon">
                  🛡️
                </div>

                <span className="portal-number">
                  03
                </span>
              </div>

              <h3>Admin Portal</h3>

              <p>
                Manage students, staff, complaints,
                departments, notices and system
                activities.
              </p>

              <Link
                to="/admin/login"
                className="portal-button"
              >
                Admin Login
                <span>→</span>
              </Link>

              <div className="portal-features">
                <span>✓ Manage Users</span>
                <span>✓ Manage Complaints</span>
                <span>✓ System Overview</span>
              </div>

            </div>

          </div>

        </section>

      </main>


      <footer className="home-footer">
        <span>
          Digital Student Assistance Network
        </span>

        <span>
          Student • Staff • Administration
        </span>
      </footer>

    </div>
  );
}