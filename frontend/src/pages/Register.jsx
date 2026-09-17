import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({name:"",email:"",password:"",studentId:"",department:"",year:"",phone:""});
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=async e=>{
    e.preventDefault(); setError("");
    if(!form.name||!form.email||!form.password) return setError("Name, email and password are required.");
    if(form.password.length<6) return setError("Password must contain at least 6 characters.");
    try{setBusy(true);await register(form);navigate("/student/dashboard");}
    catch(err){setError(err.response?.data?.message||"Registration failed.");}
    finally{setBusy(false);}
  };
  return <div className="auth-page"><div className="auth-card wide">
    <h1>Create Student Account</h1><p className="muted">Registration creates a student account.</p>
    {error&&<div className="alert error">{error}</div>}
    <form onSubmit={submit} className="form-grid">
      <label>Full Name<input name="name" value={form.name} onChange={change}/></label>
      <label>Email<input name="email" type="email" value={form.email} onChange={change}/></label>
      <label>Password<input name="password" type="password" value={form.password} onChange={change}/></label>
      <label>Student ID<input name="studentId" value={form.studentId} onChange={change}/></label>
      <label>Department<input name="department" value={form.department} onChange={change}/></label>
      <label>Year<select name="year" value={form.year} onChange={change}><option value="">Select year</option><option>First Year</option><option>Second Year</option><option>Third Year</option><option>Fourth Year</option></select></label>
      <label>Phone<input name="phone" value={form.phone} onChange={change}/></label>
      <div className="form-actions"><button className="btn btn-primary" disabled={busy}>{busy?"Creating...":"Register"}</button></div>
    </form>
    <p className="center">Already registered? <Link to="/login">Login</Link></p>
  </div></div>;
}