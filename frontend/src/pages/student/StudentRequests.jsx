import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function StudentRequests(){
 const [data,setData]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
 const load=()=>api.get("/requests").then(r=>setData(r.data)).catch(e=>setError(e.response?.data?.message||"Unable to load requests.")).finally(()=>setLoading(false));
 useEffect(()=>{load()},[]);
 const cancel=async id=>{if(!confirm("Cancel this pending request?"))return;try{await api.delete(`/requests/${id}`);load()}catch(e){setError(e.response?.data?.message||"Unable to cancel.")}};
 if(loading)return <Loading/>;
 return <Layout><div className="page-head"><h1>My Requests</h1><Link className="btn btn-primary" to="/student/request">+ New Request</Link></div>{error&&<div className="alert error">{error}</div>}
 {data.length?<div className="table-wrap panel"><table><thead><tr><th>Subject</th><th>Category</th><th>Status</th><th>Assigned Staff</th><th>Date</th><th>Action</th></tr></thead><tbody>{data.map(r=><tr key={r._id}><td>{r.subject}</td><td>{r.category?.name}</td><td><span className="status">{r.status}</span></td><td>{r.assignedStaff?.name||"Not assigned"}</td><td>{new Date(r.createdAt).toLocaleDateString()}</td><td><Link className="btn btn-small" to={`/student/request/${r._id}`}>View</Link>{r.status==="Pending"&&<button className="btn btn-danger btn-small" onClick={()=>cancel(r._id)}>Cancel</button>}</td></tr>)}</tbody></table></div>:<div className="panel empty">No requests found.</div>}</Layout>;
}