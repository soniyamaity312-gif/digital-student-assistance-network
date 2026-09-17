import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function StudentDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setError("");

        const response = await api.get("/complaints");

        // Backend returns:
        // { status: "success", data: [...] }
        setRequests(response.data.data || []);
      } catch (err) {
        console.error("Dashboard error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const pending = requests.filter(
    (x) => x.status?.toLowerCase() === "pending"
  ).length;

  const resolved = requests.filter(
    (x) => x.status?.toLowerCase() === "resolved"
  ).length;

  return (
    <Layout>
      <div className="page-head">
        <div>
          <h1>Student Dashboard</h1>
          <p className="muted">
            Manage your assistance requests.
          </p>
        </div>

        <Link
          className="btn btn-primary"
          to="/student/request"
        >
          + New Request
        </Link>
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      <div className="stats">
        <div className="stat">
          <span>Total Requests</span>
          <b>{requests.length}</b>
        </div>

        <div className="stat">
          <span>Pending</span>
          <b>{pending}</b>
        </div>

        <div className="stat">
          <span>Resolved</span>
          <b>{resolved}</b>
        </div>
      </div>

      <section className="panel">
        <div className="section-head">
          <h2>Recent Requests</h2>

          <Link to="/student/requests">
            View all
          </Link>
        </div>

        {requests.length > 0 ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Department</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {requests.slice(0, 5).map((r) => (
                  <tr key={r._id}>
                    <td>
                      <Link
                        to={`/student/request/${r._id}`}
                      >
                        {r.subject}
                      </Link>
                    </td>

                    <td>
                      {r.department_name || "General Administration"}
                    </td>

                    <td>
                      {r.priority
                        ? r.priority.charAt(0).toUpperCase() +
                          r.priority.slice(1)
                        : "Medium"}
                    </td>

                    <td>
                      <span className="status">
                        {r.status
                          ? r.status.charAt(0).toUpperCase() +
                            r.status.slice(1)
                          : "Pending"}
                      </span>
                    </td>

                    <td>
                      {r.created_at
                        ? new Date(
                            r.created_at
                          ).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty">
            No requests yet.
          </div>
        )}
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Recent Notices</h2>
        </div>

        <div className="empty">
          No notices available.
        </div>
      </section>
    </Layout>
  );
}