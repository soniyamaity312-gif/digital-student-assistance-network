import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function StudentRequestDetails() {
  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const loadRequest = async () => {
    try {
      setError("");

      const response = await api.get(`/complaints/${id}`);

      const data = response.data.data;

      setRequest(data.complaint);
      setReplies(data.replies || []);
    } catch (err) {
      console.error("Request details error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load request."
      );
    }
  };

  useEffect(() => {
    loadRequest();
  }, [id]);

  const respond = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      setBusy(true);
      setError("");

      await api.post(`/complaints/${id}/reply`, {
        message: message.trim()
      });

      setMessage("");

      await loadRequest();
    } catch (err) {
      console.error("Reply error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to send response."
      );
    } finally {
      setBusy(false);
    }
  };

  if (!request && !error) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="page-head">
        <div>
          <Link to="/student/requests">
            ← My Requests
          </Link>

          <h1>{request?.subject || "Request Details"}</h1>
        </div>
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      {request && (
        <>
          <div className="panel">
            <div className="detail-grid">

              <p>
                <b>Department</b>
                <br />
                {request.department_name ||
                  "General Administration"}
              </p>

              <p>
                <b>Priority</b>
                <br />
                <span className="status">
                  {request.priority
                    ? request.priority
                        .charAt(0)
                        .toUpperCase() +
                      request.priority.slice(1)
                    : "Medium"}
                </span>
              </p>

              <p>
                <b>Status</b>
                <br />
                <span className="status">
                  {request.status
                    ? request.status
                        .charAt(0)
                        .toUpperCase() +
                      request.status.slice(1)
                    : "Pending"}
                </span>
              </p>

              <p>
                <b>Student</b>
                <br />
                {request.student_name || "Student"}
              </p>

              <p>
                <b>Created</b>
                <br />
                {request.created_at
                  ? new Date(
                      request.created_at
                    ).toLocaleString()
                  : "-"}
              </p>

            </div>

            <hr />

            <h3>Description</h3>

            <p>{request.description}</p>
          </div>

          <div className="panel">
            <h2>Conversation</h2>

            {replies.length > 0 ? (
              replies.map((reply, index) => (
                <div
                  className="message"
                  key={reply._id || index}
                >
                  <b>
                    {reply.user_name || "User"}{" "}
                    ({reply.user_role || "User"})
                  </b>

                  <p>{reply.message}</p>

                  {reply.created_at && (
                    <small>
                      {new Date(
                        reply.created_at
                      ).toLocaleString()}
                    </small>
                  )}
                </div>
              ))
            ) : (
              <div className="empty">
                No responses yet.
              </div>
            )}

            <form onSubmit={respond}>
              <label>
                Add message

                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Write a message..."
                />
              </label>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={busy}
              >
                {busy
                  ? "Sending..."
                  : "Send Message"}
              </button>
            </form>
          </div>
        </>
      )}
    </Layout>
  );
}