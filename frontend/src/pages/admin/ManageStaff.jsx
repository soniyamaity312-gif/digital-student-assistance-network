import React, { useEffect,useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";

export default function ManageStaff(){
 const [rows,setRows]=useState([]),[form,setForm]=useState({name:"",email:"",password:"",department:"",phone:""}),[msg,setMsg]=useState(""),[error,setError]=useState("");
 const load=()=>api.get("/users/staff").then(r=>setRows(r.data)).catch(e=>setError(e.response?.data?.message||"Unable to load staff."));
 useEffect(()=>{load()},[]);
 const create=async e=>{e.preventDefault();try{await api.post("/users/staff",form);setMsg("Staff created.");setForm({name:"",email:"",password:"",department:"",phone:""});load()}catch(e){setError(e.response?.data?.message||"Creation failed.")}};
 const del=async id=>{if(!confirm("Delete this staff member?"))return;try{await api.delete(`/users/${id}`);load()}catch(e){setError(e.response?.data?.message||"Delete failed.")}};
 return <Layout><h1>Manage Staff</h1>{msg&&<div className="alert success">{msg}</div>}{error&&<div className="alert error">{error}</div>}<div className="two-col"><div className="panel"><h2>Add Staff</h2><form onSubmit={create}><label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label><label>Department<input value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/></label><label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label><button className="btn btn-primary">Create Staff</button></form></div><div className="panel"><h2>Staff Members</h2>{rows.map(x=><div className="list-row" key={x._id}><div><b>{x.name}</b><p className="muted">{x.email} · {x.department}</p></div><button className="btn btn-danger btn-small" onClick={()=>del(x._id)}>Delete</button></div>)}{!rows.length&&<div className="empty">No staff.</div>}</div></div></Layout>;
}