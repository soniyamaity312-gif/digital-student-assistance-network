import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function StaffRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/complaints");

      setRequests(response.data.data || []);
    } catch (err) {
      console.error("Staff requests error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const shown =
    filter === "All"
      ? requests
      : requests.filter(
          (request) => request.status === filter
        );

  return (
    <Layout>
      <div className="page-head">
        <h1>Assigned Requests</h1>

        <select
          className="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">
            In Progress
          </option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      <div className="table-wrap panel">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Department</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {shown.map((request) => (
              <tr key={request._id}>
                <td>
                  {request.student_name || "Student"}
                </td>

                <td>{request.subject}</td>

                <td>
                  {request.department_name}
                </td>

                <td>
                  {request.priority
                    ? request.priority
                        .charAt(0)
                        .toUpperCase() +
                      request.priority.slice(1)
                    : "Medium"}
                </td>

                <td>
                  <span className="status">
                    {request.status
                      ? request.status
                          .replace("_", " ")
                          .replace(/\b\w/g, (c) =>
                            c.toUpperCase()
                          )
                      : "Pending"}
                  </span>
                </td>

                <td>
                  {request.created_at
                    ? new Date(
                        request.created_at
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  <Link
                    className="btn btn-small"
                    to={`/staff/request/${request._id}`}
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!shown.length && (
          <div className="empty">
            No requests found.
          </div>
        )}
      </div>
    </Layout>
  );
}