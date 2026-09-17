import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Layout from "../../components/Layout";

export default function StaffProfile(){
 const {user}=useAuth();const [form,setForm]=useState({name:user?.name||"",department:user?.department||"",phone:user?.phone||""});const [msg,setMsg]=useState("");
 const submit=async e=>{e.preventDefault();try{await api.put(`/users/${user.id}`,form);setMsg("Profile updated successfully.")}catch(e){setMsg(e.response?.data?.message||"Update failed.")}};
 return <Layout><h1>Staff Profile</h1><div className="panel narrow">{msg&&<div className="alert success">{msg}</div>}<form onSubmit={submit}><label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input disabled value={user?.email||""}/></label><label>Department<input value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/></label><label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label><button className="btn btn-primary">Save</button></form></div></Layout>;
}