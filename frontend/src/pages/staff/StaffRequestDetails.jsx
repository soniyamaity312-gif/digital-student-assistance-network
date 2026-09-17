import React, {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

const statuses = [
  {
    value: "pending",
    label: "Pending"
  },
  {
    value: "in_progress",
    label: "In Progress"
  },
  {
    value: "resolved",
    label: "Resolved"
  }
];

export default function StaffRequestDetails() {
  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const loadRequest = async () => {
    try {
      setError("");

      const response = await api.get(
        `/complaints/${id}`
      );

      const data = response.data.data;

      setRequest(data.complaint);
      setStatus(data.complaint.status);
    } catch (err) {
      console.error(
        "Request details error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load request."
      );
    }
  };

  useEffect(() => {
    loadRequest();
  }, [id]);

  const updateStatus = async () => {
    try {
      setBusy(true);
      setError("");

      await api.put(
        `/complaints/${id}/status`,
        {
          status
        }
      );

      await loadRequest();
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Status update failed."
      );
    } finally {
      setBusy(false);
    }
  };

  const respond = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    try {
      setBusy(true);
      setError("");

      await api.post(
        `/complaints/${id}/reply`,
        {
          message: message.trim()
        }
      );

      setMessage("");

      await loadRequest();
    } catch (err) {
      console.error(
        "Reply error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Response failed."
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
      <Link to="/staff/requests">
        ← Assigned Requests
      </Link>

      <h1>
        {request?.subject || "Request Details"}
      </h1>

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
                <b>Student</b>
                <br />
                {request.student_name ||
                  "Student"}
              </p>

              <p>
                <b>Department</b>
                <br />
                {request.department_name}
              </p>

              <p>
                <b>Priority</b>
                <br />
                {request.priority
                  ? request.priority
                      .charAt(0)
                      .toUpperCase() +
                    request.priority.slice(1)
                  : "Medium"}
              </p>

              <p>
                <b>Status</b>
                <br />
                {request.status
                  ?.replace("_", " ")
                  .replace(/\b\w/g, (c) =>
                    c.toUpperCase()
                  )}
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

            <p>
              {request.description}
            </p>

            <hr />

            <div className="inline">
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                {statuses.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>

              <button
                className="btn btn-primary"
                onClick={updateStatus}
                disabled={busy}
              >
                {busy
                  ? "Updating..."
                  : "Update Status"}
              </button>
            </div>
          </div>

          <div className="panel">
            <h2>Conversation</h2>

            {request.replies?.length > 0 ? (
              request.replies.map(
                (reply) => (
                  <div
                    className="message"
                    key={reply._id}
                  >
                    <b>
                      {reply.user_name} (
                      {reply.user_role}
                      )
                    </b>

                    <p>
                      {reply.message}
                    </p>

                    {reply.created_at && (
                      <small>
                        {new Date(
                          reply.created_at
                        ).toLocaleString()}
                      </small>
                    )}
                  </div>
                )
              )
            ) : (
              <div className="empty">
                No responses yet.
              </div>
            )}

            <form onSubmit={respond}>
              <label>
                Reply

                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  placeholder="Write a reply..."
                />
              </label>

              <button
                className="btn btn-primary"
                disabled={busy}
              >
                {busy
                  ? "Sending..."
                  : "Send Reply"}
              </button>
            </form>
          </div>
        </>
      )}
    </Layout>
  );
}