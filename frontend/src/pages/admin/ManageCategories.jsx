import React, { useEffect,useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";

export default function ManageCategories(){
 const empty={name:"",description:""};const [form,setForm]=useState(empty),[rows,setRows]=useState([]),[editing,setEditing]=useState(null),[error,setError]=useState("");
 const load=()=>api.get("/categories").then(r=>setRows(r.data)).catch(e=>setError(e.response?.data?.message||"Unable to load categories."));
 useEffect(()=>{load()},[]);
 const save=async e=>{e.preventDefault();try{if(editing)await api.put(`/categories/${editing}`,form);else await api.post("/categories",form);setForm(empty);setEditing(null);load()}catch(e){setError(e.response?.data?.message||"Save failed.")}};
 const del=async id=>{if(!confirm("Delete this category?"))return;try{await api.delete(`/categories/${id}`);load()}catch(e){setError(e.response?.data?.message||"Delete failed.")}};
 return <Layout><h1>Manage Categories</h1>{error&&<div className="alert error">{error}</div>}<div className="two-col"><div className="panel"><h2>{editing?"Edit":"Add"} Category</h2><form onSubmit={save}><label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Description<textarea rows="5" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label><button className="btn btn-primary">{editing?"Update":"Create"}</button>{editing&&<button type="button" className="btn btn-secondary" onClick={()=>{setEditing(null);setForm(empty)}}>Cancel</button>}</form></div><div className="panel"><h2>Categories</h2>{rows.map(c=><div className="list-row" key={c._id}><div><b>{c.name}</b><p className="muted">{c.description}</p></div><div><button className="btn btn-small" onClick={()=>{setEditing(c._id);setForm({name:c.name,description:c.description||""})}}>Edit</button> <button className="btn btn-danger btn-small" onClick={()=>del(c._id)}>Delete</button></div></div>)}{!rows.length&&<div className="empty">No categories.</div>}</div></div></Layout>;
}