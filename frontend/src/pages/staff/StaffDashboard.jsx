import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function StaffDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadComplaints = async () => {
    try {
      setError("");

      const response = await api.get("/complaints");

      setComplaints(response.data.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to load complaints."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const pending = complaints.filter(
    (item) => item.status === "pending"
  ).length;

  const inProgress = complaints.filter(
    (item) => item.status === "in_progress"
  ).length;

  const resolved = complaints.filter(
    (item) => item.status === "resolved"
  ).length;

  return (
    <Layout>

      <div className="page-head">
        <div>
          <h1>Staff Dashboard</h1>
          <p className="muted">
            Manage complaints assigned to your department.
          </p>
        </div>

        <button
          className="btn btn-secondary"
          onClick={loadComplaints}
        >
          ↻ Refresh
        </button>
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      <div className="stats">

        <div className="stat">
          <span>Total Complaints</span>
          <b>{complaints.length}</b>
        </div>

        <div className="stat">
          <span>Pending</span>
          <b>{pending}</b>
        </div>

        <div className="stat">
          <span>In Progress</span>
          <b>{inProgress}</b>
        </div>

        <div className="stat">
          <span>Resolved</span>
          <b>{resolved}</b>
        </div>

      </div>


      <div className="panel">

        <div className="section-head">
          <div>
            <h2>Recent Complaints</h2>
            <p className="muted">
              Complaints from your department
            </p>
          </div>

          <Link
            to="/staff/requests"
            className="btn btn-primary"
          >
            View All
          </Link>
        </div>


        {complaints.length === 0 ? (

          <div className="empty">
            No complaints found for your department.
          </div>

        ) : (

          <div className="table-wrap">

            <table>

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {complaints.slice(0, 5).map((complaint) => (

                  <tr
                    key={complaint._id || complaint.id}
                  >

                    <td>
                      {complaint.student_name}
                    </td>

                    <td>
                      <strong>
                        {complaint.subject}
                      </strong>
                    </td>

                    <td>
                      <span className="status">
                        {complaint.priority}
                      </span>
                    </td>

                    <td>
                      <span className="status">
                        {complaint.status === "in_progress"
                          ? "In Progress"
                          : complaint.status}
                      </span>
                    </td>

                    <td>
                      <Link
                        to={`/staff/request/${
                          complaint._id || complaint.id
                        }`}
                        className="btn btn-primary btn-small"
                      >
                        View
                      </Link>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </Layout>
  );
}