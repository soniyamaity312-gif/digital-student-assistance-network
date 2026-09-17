import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await api.get("/admin/stats");
        setStats(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load admin dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="admin-dashboard">

        <div className="page-head">
          <div>
            <h1>Admin Dashboard</h1>
            <p className="muted">
              Monitor and manage the Digital Student Assistance Network.
            </p>
          </div>
        </div>

        {error && (
          <div className="alert error">
            {error}
          </div>
        )}

        {stats && (
          <>
            {/* STAT CARDS */}

            <div className="stats">

              <div className="stat admin-stat">
                <div className="admin-stat-icon">🎓</div>
                <span>Total Students</span>
                <b>{stats.students}</b>
              </div>

              <div className="stat admin-stat">
                <div className="admin-stat-icon">👨‍🏫</div>
                <span>Total Staff</span>
                <b>{stats.staff}</b>
              </div>

              <div className="stat admin-stat">
                <div className="admin-stat-icon">🏢</div>
                <span>Departments</span>
                <b>{stats.departmentCount}</b>
              </div>

              <div className="stat admin-stat">
                <div className="admin-stat-icon">📋</div>
                <span>Total Complaints</span>
                <b>{stats.complaints}</b>
              </div>

            </div>


            {/* COMPLAINT STATUS */}

            <div className="panel">

              <div className="admin-section-title">
                <div>
                  <h2>Complaint Overview</h2>
                  <p className="muted">
                    Current complaint status
                  </p>
                </div>

                <Link
                  to="/admin/requests"
                  className="btn btn-primary"
                >
                  Manage Complaints
                </Link>
              </div>

              <div className="complaint-status-grid">

                <div className="complaint-status">
                  <span>Pending</span>
                  <b>
                    {stats.complaintStatus.pending}
                  </b>
                </div>

                <div className="complaint-status">
                  <span>In Progress</span>
                  <b>
                    {stats.complaintStatus.in_progress}
                  </b>
                </div>

                <div className="complaint-status">
                  <span>Resolved</span>
                  <b>
                    {stats.complaintStatus.resolved}
                  </b>
                </div>

              </div>

            </div>


            {/* DEPARTMENTS */}

            <div className="panel">

              <div className="admin-section-title">
                <div>
                  <h2>Departments</h2>
                  <p className="muted">
                    Staff distribution by department
                  </p>
                </div>

                <Link
                  to="/admin/staff"
                  className="btn btn-secondary"
                >
                  Manage Staff
                </Link>
              </div>

              <div className="department-list">

                {stats.departments?.length > 0 ? (

                  stats.departments.map((department) => (

                    <div
                      className="department-item"
                      key={department.name}
                    >

                      <div className="department-info">

                        <div className="department-icon">
                          🏢
                        </div>

                        <div>
                          <div className="department-name">
                            {department.name}
                          </div>

                          <div className="department-meta">
                            Staff members
                          </div>
                        </div>

                      </div>

                      <div className="department-count">
                        {department.staffCount}
                      </div>

                    </div>

                  ))

                ) : (

                  <div className="empty">
                    No departments found.
                  </div>

                )}

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="panel">

              <div className="admin-section-title">
                <div>
                  <h2>Quick Actions</h2>
                  <p className="muted">
                    Frequently used administration tools
                  </p>
                </div>
              </div>

              <div className="admin-actions">

                <Link
                  to="/admin/students"
                  className="admin-action"
                >
                  <strong>👨‍🎓 Manage Students</strong>
                  <span>
                    View and manage registered students.
                  </span>
                </Link>

                <Link
                  to="/admin/staff"
                  className="admin-action"
                >
                  <strong>👨‍🏫 Manage Staff</strong>
                  <span>
                    View staff and department assignments.
                  </span>
                </Link>

                <Link
                  to="/admin/requests"
                  className="admin-action"
                >
                  <strong>📋 Manage Complaints</strong>
                  <span>
                    Review and manage student complaints.
                  </span>
                </Link>

                <Link
                  to="/admin/notices"
                  className="admin-action"
                >
                  <strong>📢 Manage Notices</strong>
                  <span>
                    Create and manage student notices.
                  </span>
                </Link>

                <Link
                  to="/admin/categories"
                  className="admin-action"
                >
                  <strong>🏷️ Categories</strong>
                  <span>
                    Manage complaint categories.
                  </span>
                </Link>

              </div>

            </div>

          </>
        )}

      </div>
    </Layout>
  );
}