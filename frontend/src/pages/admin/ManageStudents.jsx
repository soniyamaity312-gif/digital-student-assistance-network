import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/students");

      setStudents(response.data.data || []);
    } catch (err) {
      console.error("Student loading error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load students."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="page-head">
        <div>
          <h1>Manage Students</h1>
          <p className="muted">
            View all registered students in the system.
          </p>
        </div>

        <div className="stat">
          <span>Total Students</span>
          <b>{students.length}</b>
        </div>
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      <div className="panel table-wrap">
        {students.length === 0 ? (
          <div className="empty">
            No students are registered yet.
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Student ID</th>
                <th>Department</th>
                <th>Year</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <strong>{student.name}</strong>
                  </td>

                  <td>{student.email}</td>

                  <td>
                    {student.studentId || "Not provided"}
                  </td>

                  <td>
                    {student.department || "Not provided"}
                  </td>

                  <td>
                    {student.year || "Not provided"}
                  </td>

                  <td>
                    {student.phone || "Not provided"}
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