import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/Layout";

export default function CreateRequest() {
  const nav = useNavigate();

  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    department_id: "",
    department_name: "",
    subject: "",
    description: ""
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setError("");

        const response = await api.get("/departments");

        // Backend returns:
        // { status: "success", data: [...] }
        setDepartments(response.data.data || []);
      } catch (err) {
        console.error("Department loading error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load departments."
        );
      }
    };

    loadDepartments();
  }, []);

  const handleDepartmentChange = (e) => {
    const selectedId = e.target.value;

    const selectedDepartment = departments.find(
      (department) => department.id === selectedId
    );

    setForm({
      ...form,
      department_id: selectedId,
      department_name: selectedDepartment
        ? selectedDepartment.name
        : ""
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.department_id ||
      !form.subject.trim() ||
      !form.description.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setBusy(true);

      const response = await api.post("/complaints", {
        department_id: form.department_id,
        department_name: form.department_name,
        subject: form.subject.trim(),
        description: form.description.trim(),
        priority: "auto"
      });

      console.log("Complaint created:", response.data);

      nav("/student/requests");
    } catch (err) {
      console.error("Submission error:", err);

      setError(
        err.response?.data?.message ||
          "Submission failed."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout>
      <div className="page-head">
        <div>
          <h1>Submit Assistance Request</h1>

          <p className="muted">
            Describe your academic or campus-related issue.
          </p>
        </div>
      </div>

      <div className="panel narrow">
        {error && (
          <div className="alert error">
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <label>
            Department

            <select
              value={form.department_id}
              onChange={handleDepartmentChange}
            >
              <option value="">
                Select department
              </option>

              {departments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Subject

            <input
              type="text"
              value={form.subject}
              onChange={(e) =>
                setForm({
                  ...form,
                  subject: e.target.value
                })
              }
              placeholder="Enter your issue"
            />
          </label>

          <label>
            Description

            <textarea
              rows="7"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
              placeholder="Describe your issue in detail"
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={busy}
          >
            {busy
              ? "Submitting..."
              : "Submit Request"}
          </button>
        </form>
      </div>
    </Layout>
  );
}