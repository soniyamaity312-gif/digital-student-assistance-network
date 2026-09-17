import React, { useEffect,useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function ManageStudents(){
 const [rows,setRows]=useState([]),[loading,setLoading]=useState(true),[msg,setMsg]=useState("");
 const load=()=>api.get("/users/students").then(r=>setRows(r.data)).finally(()=>setLoading(false));
 useEffect(()=>{load()},[]);
 const del=async id=>{if(!confirm("Delete this student?"))return;try{await api.delete(`/users/${id}`);load()}catch(e){setMsg(e.response?.data?.message||"Delete failed.")}};
 if(loading)return <Loading/>;
 return <Layout><h1>Manage Students</h1>{msg&&<div className="alert error">{msg}</div>}<div className="table-wrap panel"><table><thead><tr><th>Name</th><th>Email</th><th>Student ID</th><th>Department</th><th>Year</th><th></th></tr></thead><tbody>{rows.map(x=><tr key={x._id}><td>{x.name}</td><td>{x.email}</td><td>{x.studentId}</td><td>{x.department}</td><td>{x.year}</td><td><button className="btn btn-danger btn-small" onClick={()=>del(x._id)}>Delete</button></td></tr>)}</tbody></table>{!rows.length&&<div className="empty">No students.</div>}</div></Layout>;
}