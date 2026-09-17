import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function StaffRequestDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [reply, setReply] =
    useState("");

  const [status, setStatus] =
    useState("");


  const loadComplaint = async () => {
    try {
      setError("");

      const response =
        await api.get(`/complaints/${id}`);

      const data = response.data.data;

      setComplaint(data);
      setStatus(data.status);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to load complaint."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadComplaint();
  }, [id]);


  const updateStatus = async (newStatus) => {
    try {
      setError("");
      setMessage("");

      await api.put(
        `/complaints/${id}/status`,
        {
          status: newStatus
        }
      );

      setStatus(newStatus);

      setMessage(
        "Complaint status updated successfully."
      );

      await loadComplaint();

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to update status."
      );
    }
  };


  const sendReply = async (e) => {
    e.preventDefault();

    if (!reply.trim()) {
      setError("Reply cannot be empty.");
      return;
    }

    try {
      setError("");
      setMessage("");

      await api.post(
        `/complaints/${id}/reply`,
        {
          message: reply.trim()
        }
      );

      setReply("");

      setMessage(
        "Reply sent successfully."
      );

      await loadComplaint();

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to send reply."
      );
    }
  };


  if (loading) {
    return <Loading />;
  }


  if (!complaint) {
    return (
      <Layout>
        <div className="alert error">
          Complaint not found.
        </div>
      </Layout>
    );
  }


  return (
    <Layout>

      <div className="page-head">

        <div>
          <Link to="/staff/requests">
            ← Back to Requests
          </Link>

          <h1>
            {complaint.subject}
          </h1>

          <p className="muted">
            Complaint details
          </p>
        </div>

      </div>


      {error && (
        <div className="alert error">
          {error}
        </div>
      )}


      {message && (
        <div className="alert success">
          {message}
        </div>
      )}


      <div className="detail-grid">

        <div className="card">
          <span className="muted">
            Student
          </span>

          <strong>
            {complaint.student_name}
          </strong>
        </div>


        <div className="card">
          <span className="muted">
            Department
          </span>

          <strong>
            {complaint.department_name}
          </strong>
        </div>


        <div className="card">
          <span className="muted">
            Priority
          </span>

          <strong>
            {complaint.priority}
          </strong>
        </div>


        <div className="card">
          <span className="muted">
            Status
          </span>

          <strong>
            {status === "in_progress"
              ? "In Progress"
              : status}
          </strong>
        </div>

      </div>


      <div className="two-col">

        <div className="panel">

          <h2>Description</h2>

          <p>
            {complaint.description}
          </p>


          <h2>
            Update Status
          </h2>

          <select
            value={status}
            onChange={(e) =>
              updateStatus(e.target.value)
            }
          >
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

        </div>


        <div className="panel">

          <h2>Conversation</h2>

          {complaint.replies?.length === 0 ? (

            <div className="empty">
              No replies yet.
            </div>

          ) : (

            complaint.replies?.map(
              (item, index) => (

                <div
                  className="message"
                  key={
                    item._id || index
                  }
                >

                  <strong>
                    {item.user_name}
                  </strong>

                  <small className="muted">
                    {" "}
                    ({item.user_role})
                  </small>

                  <p>
                    {item.message}
                  </p>

                  <small className="muted">
                    {item.created_at
                      ? new Date(
                          item.created_at
                        ).toLocaleString()
                      : ""}
                  </small>

                </div>

              )
            )

          )}


          <form onSubmit={sendReply}>

            <label>
              Reply to Student

              <textarea
                rows="4"
                value={reply}
                onChange={(e) =>
                  setReply(
                    e.target.value
                  )
                }
                placeholder="Write your response..."
              />

            </label>

            <button
              className="btn btn-primary"
              type="submit"
            >
              Send Reply
            </button>

          </form>

        </div>

      </div>

    </Layout>
  );
}