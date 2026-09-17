import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function StaffRequests() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

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

  const filteredComplaints =
    filter === "all"
      ? complaints
      : complaints.filter(
          (complaint) =>
            complaint.status === filter
        );

  return (
    <Layout>

      <div className="page-head">

        <div>
          <h1>Assigned Requests</h1>
          <p className="muted">
            View and manage complaints from your department.
          </p>
        </div>

        <div className="inline">

          <select
            className="filter"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="all">
              All Requests
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="in_progress">
              In Progress
            </option>

            <option value="resolved">
              Resolved
            </option>
          </select>

          <button
            className="btn btn-secondary"
            onClick={loadComplaints}
          >
            ↻ Refresh
          </button>

        </div>

      </div>


      {error && (
        <div className="alert error">
          {error}
        </div>
      )}


      <div className="panel table-wrap">

        {filteredComplaints.length === 0 ? (

          <div className="empty">
            No complaints found.
          </div>

        ) : (

          <table>

            <thead>
              <tr>
                <th>Student</th>
                <th>Subject</th>
                <th>Department</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredComplaints.map(
                (complaint) => (

                  <tr
                    key={
                      complaint._id ||
                      complaint.id
                    }
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
                      {complaint.department_name}
                    </td>

                    <td>
                      <span className="status">
                        {complaint.priority}
                      </span>
                    </td>

                    <td>
                      <span className="status">
                        {complaint.status ===
                        "in_progress"
                          ? "In Progress"
                          : complaint.status}
                      </span>
                    </td>

                    <td>
                      {complaint.created_at
                        ? new Date(
                            complaint.created_at
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <Link
                        to={`/staff/request/${
                          complaint._id ||
                          complaint.id
                        }`}
                        className="btn btn-primary btn-small"
                      >
                        Open
                      </Link>
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </Layout>
  );
}