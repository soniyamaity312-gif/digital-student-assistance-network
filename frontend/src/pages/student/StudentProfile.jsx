import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Layout from "../../components/Layout";

export default function StudentProfile(){
 const {user}=useAuth();const [form,setForm]=useState({name:user?.name||"",department:user?.department||"",year:user?.year||"",phone:user?.phone||"",studentId:user?.studentId||""});const [msg,setMsg]=useState("");
 const submit=async e=>{e.preventDefault();try{await api.put(`/users/${user.id}`,form);setMsg("Profile updated. Reload to see all account changes.")}catch(e){setMsg(e.response?.data?.message||"Update failed.")}};
 return <Layout><h1>My Profile</h1><div className="panel narrow">{msg&&<div className="alert success">{msg}</div>}<form onSubmit={submit} className="form-grid"><label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input value={user?.email||""} disabled/></label><label>Student ID<input value={form.studentId} onChange={e=>setForm({...form,studentId:e.target.value})}/></label><label>Department<input value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/></label><label>Year<input value={form.year} onChange={e=>setForm({...form,year:e.target.value})}/></label><label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label><button className="btn btn-primary">Save Profile</button></form></div></Layout>;
}