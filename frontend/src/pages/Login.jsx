import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setError("");
    if (!form.email || !form.password) return setError("Email and password are required.");
    try {
      setBusy(true);
      const data = await login(
        form.email,
        form.password,
        "student"
      );
      navigate(`/${data.user.role}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally { setBusy(false); }
  };

  return <div className="auth-page"><div className="auth-card">
    <h1>Digital Student Assistance Network</h1><p className="muted">Sign in to continue</p>
    {error && <div className="alert error">{error}</div>}
    <form onSubmit={submit}>
      <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
      <label>Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
      <button className="btn btn-primary full" disabled={busy}>{busy ? "Logging in..." : "Login"}</button>
    </form>
    <p className="center">New student? <Link to="/register">Create an account</Link></p>
  </div></div>;
}