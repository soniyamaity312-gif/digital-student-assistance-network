import React, { useEffect,useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";

export default function ManageNotices(){
 const empty={title:"",description:"",targetAudience:"All"};const [form,setForm]=useState(empty),[rows,setRows]=useState([]),[editing,setEditing]=useState(null),[error,setError]=useState("");
 const load=()=>api.get("/notices").then(r=>setRows(r.data)).catch(e=>setError(e.response?.data?.message||"Unable to load notices."));
 useEffect(()=>{load()},[]);
 const save=async e=>{e.preventDefault();try{if(editing)await api.put(`/notices/${editing}`,form);else await api.post("/notices",form);setForm(empty);setEditing(null);load()}catch(e){setError(e.response?.data?.message||"Save failed.")}};
 const edit=n=>{setEditing(n._id);setForm({title:n.title,description:n.description,targetAudience:n.targetAudience})};
 const del=async id=>{if(!confirm("Delete this notice?"))return;try{await api.delete(`/notices/${id}`);load()}catch(e){setError(e.response?.data?.message||"Delete failed.")}};
 return <Layout><h1>Manage Notices</h1>{error&&<div className="alert error">{error}</div>}<div className="two-col"><div className="panel"><h2>{editing?"Edit Notice":"Create Notice"}</h2><form onSubmit={save}><label>Title<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label><label>Description<textarea rows="7" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label><label>Audience<select value={form.targetAudience} onChange={e=>setForm({...form,targetAudience:e.target.value})}><option>All</option><option>Students</option><option>Staff</option></select></label><button className="btn btn-primary">{editing?"Update":"Publish"}</button>{editing&&<button type="button" className="btn btn-secondary" onClick={()=>{setEditing(null);setForm(empty)}}>Cancel</button>}</form></div><div className="panel"><h2>Published Notices</h2>{rows.map(n=><div className="list-row" key={n._id}><div><b>{n.title}</b><p>{n.targetAudience}</p></div><div><button className="btn btn-small" onClick={()=>edit(n)}>Edit</button> <button className="btn btn-danger btn-small" onClick={()=>del(n._id)}>Delete</button></div></div>)}{!rows.length&&<div className="empty">No notices.</div>}</div></div></Layout>;
}