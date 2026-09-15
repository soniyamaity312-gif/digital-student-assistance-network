import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const response = await fetch(
        "http://localhost/smart-student-helpdesk/backend/auth/check_session.php"
      );

      const result = await response.json();

      if (result.logged_in) {
        setLoggedIn(true);
        setUserRole(result.user.role);
      }
    } catch (error) {
      console.error("Session check failed:", error);
    }
  }

  function dashboardLink(role) {
    if (role === "student") {
      return "/student/dashboard.html";
    }

    if (role === "staff") {
      return "/staff/dashboard.html";
    }

    if (role === "admin") {
      return "/admin/dashboard.html";
    }

    return "#";
  }

  return (
    <>
      <header>
        <div className="container nav">
          <a href="/" className="logo">
            SmartHelpdesk
          </a>
        </div>
      </header>

      <div className="container">
        <div className="hero-text">
          <h1>Welcome to Smart Student Helpdesk</h1>

          <p>
            Efficiently track and resolve campus issues. Select your role to
            continue.
          </p>
        </div>

        <div className="role-select">

          {/* Student */}
          <div className="role-card">
            <div>
              <h2>👨‍🎓 Student</h2>

              <p>
                Raise tickets, track status, and chat with staff.
              </p>
            </div>

            <div>
              <a
                href={
                  loggedIn && userRole === "student"
                    ? dashboardLink("student")
                    : "/student/login.html"
                }
                className={
                  loggedIn && userRole === "student"
                    ? "btn btn-success"
                    : "btn"
                }
              >
                {loggedIn && userRole === "student"
                  ? "Go to Dashboard"
                  : "Login"}
              </a>

              {!(
                loggedIn && userRole === "student"
              ) && (
                  <div style={{ marginTop: "15px" }}>
                    <a
                      href="/student/register.html"
                      style={{
                        color: "var(--primary)",
                        fontWeight: 500,
                      }}
                    >
                      New User? Register
                    </a>
                  </div>
                )}
            </div>
          </div>

          {/* Staff */}
          <div className="role-card">
            <div>
              <h2>👨‍🏫 Staff</h2>

              <p>
                Manage department complaints and provide solutions.
              </p>
            </div>

            <div>
              <a
                href={
                  loggedIn && userRole === "staff"
                    ? dashboardLink("staff")
                    : "/staff/login.html"
                }
                className={
                  loggedIn && userRole === "staff"
                    ? "btn btn-success"
                    : "btn btn-secondary"
                }
                style={
                  !(loggedIn && userRole === "staff")
                    ? { backgroundColor: "var(--secondary)" }
                    : {}
                }
              >
                {loggedIn && userRole === "staff"
                  ? "Go to Dashboard"
                  : "Login"}
              </a>
            </div>
          </div>

          {/* Admin */}
          <div className="role-card">
            <div>
              <h2>⚙️ Admin</h2>

              <p>
                Manage users, departments, and oversee system.
              </p>
            </div>

            <div>
              <a
                href={
                  loggedIn && userRole === "admin"
                    ? dashboardLink("admin")
                    : "/admin/login.html"
                }
                className={
                  loggedIn && userRole === "admin"
                    ? "btn btn-success"
                    : "btn btn-dark"
                }
              >
                {loggedIn && userRole === "admin"
                  ? "Go to Dashboard"
                  : "Login"}
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;