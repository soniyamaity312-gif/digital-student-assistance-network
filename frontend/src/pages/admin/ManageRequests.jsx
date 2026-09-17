import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [requestResponse, staffResponse] =
        await Promise.all([
          api.get("/admin/requests"),
          api.get("/admin/staff")
        ]);

      setRequests(requestResponse.data.data || []);
      setStaff(staffResponse.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const assignStaff = async (
    complaintId,
    staffId
  ) => {
    if (!staffId) return;

    try {
      await api.put(
        `/admin/requests/${complaintId}/assign`,
        { staffId }
      );

      loadData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to assign staff."
      );
    }
  };

  const updateStatus = async (
    complaintId,
    status
  ) => {
    try {
      await api.put(
        `/admin/requests/${complaintId}/status`,
        { status }
      );

      loadData();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to update status."
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>

      <div className="page-head">
        <div>
          <h1>Manage Complaints</h1>
          <p className="muted">
            Review, assign and update student complaints.
          </p>
        </div>
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      <div className="panel table-wrap">

        {requests.length === 0 ? (
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
                <th>Assigned Staff</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {requests.map((request) => (

                <tr key={request._id || request.id}>

                  <td>
                    {request.student_name}
                  </td>

                  <td>
                    <strong>
                      {request.subject}
                    </strong>
                  </td>

                  <td>
                    {request.department_name}
                  </td>

                  <td>
                    <span className="status">
                      {request.priority}
                    </span>
                  </td>

                  <td>
                    <select
                      value={
                        request.assigned_staff_id || ""
                      }
                      onChange={(e) =>
                        assignStaff(
                          request._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        Select Staff
                      </option>

                      {staff
                        .filter(
                          (member) =>
                            member.department ===
                            request.department_name
                        )
                        .map((member) => (
                          <option
                            key={member.id}
                            value={member.id}
                          >
                            {member.name}
                          </option>
                        ))}
                    </select>
                  </td>

                  <td>
                    <select
                      value={request.status}
                      onChange={(e) =>
                        updateStatus(
                          request._id,
                          e.target.value
                        )
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
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </Layout>
  );
}