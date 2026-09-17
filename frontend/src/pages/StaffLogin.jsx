import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function StaffLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("Email and password are required.");
    }

    try {
      setBusy(true);

      const data = await login(
        form.email,
        form.password
      );

      if (data.user.role !== "staff") {
        return setError(
          "This account is not registered as staff."
        );
      }

      navigate("/staff/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Staff Login</h1>

        <p className="muted">
          Sign in to your staff account
        </p>

        {error && (
          <div className="alert error">
            {error}
          </div>
        )}

        <form onSubmit={submit}>

          <label>
            Email

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
            />
          </label>

          <button
            className="btn btn-primary full"
            disabled={busy}
          >
            {busy ? "Logging in..." : "Staff Login"}
          </button>

        </form>

        <p className="center">
          <Link to="/">
            ← Back to Portal Selection
          </Link>
        </p>

      </div>
    </div>
  );
}