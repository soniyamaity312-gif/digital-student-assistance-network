import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function StaffDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await api.get("/complaints");

        setRequests(response.data.data || []);
      } catch (err) {
        console.error("Staff dashboard error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load assigned requests."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const pending = requests.filter(
    (r) => r.status === "pending"
  ).length;

  const progress = requests.filter(
    (r) => r.status === "in_progress"
  ).length;

  const resolved = requests.filter(
    (r) => r.status === "resolved"
  ).length;

  return (
    <Layout>
      <div className="page-head">
        <div>
          <h1>Staff Dashboard</h1>

          <p className="muted">
            Requests assigned to your department.
          </p>
        </div>

        <Link
          className="btn btn-primary"
          to="/staff/requests"
        >
          View Requests
        </Link>
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      <div className="stats">
        <div className="stat">
          <span>Assigned Requests</span>
          <b>{requests.length}</b>
        </div>

        <div className="stat">
          <span>Pending</span>
          <b>{pending}</b>
        </div>

        <div className="stat">
          <span>In Progress</span>
          <b>{progress}</b>
        </div>

        <div className="stat">
          <span>Resolved</span>
          <b>{resolved}</b>
        </div>
      </div>

      <div className="panel">
        <h2>Recent Requests</h2>

        {requests.length > 0 ? (
          requests.slice(0, 5).map((request) => (
            <div
              className="list-row"
              key={request._id}
            >
              <div>
                <b>{request.subject}</b>

                <p className="muted">
                  {request.student_name || "Student"} ·{" "}
                  {request.department_name}
                </p>
              </div>

              <Link
                to={`/staff/request/${request._id}`}
              >
                Open
              </Link>
            </div>
          ))
        ) : (
          <div className="empty">
            No assigned requests.
          </div>
        )}
      </div>
    </Layout>
  );
}