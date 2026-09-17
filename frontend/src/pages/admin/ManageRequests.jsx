import React, { useEffect,useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

const statuses=["Pending","Assigned","In Progress","Resolved","Rejected"];
export default function ManageRequests(){
 const [rows,setRows]=useState([]),[staff,setStaff]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
 const load=()=>Promise.all([api.get("/requests"),api.get("/users/staff")]).then(([r,s])=>{setRows(r.data);setStaff(s.data)}).catch(e=>setError(e.response?.data?.message||"Unable to load data.")).finally(()=>setLoading(false));
 useEffect(()=>{load()},[]);
 const assign=async(id,staffId)=>{if(!staffId)return;try{await api.put(`/requests/${id}/assign`,{staffId});load()}catch(e){setError(e.response?.data?.message||"Assignment failed.")}};
 const status=async(id,value)=>{try{await api.put(`/requests/${id}/status`,{status:value});load()}catch(e){setError(e.response?.data?.message||"Status update failed.")}};
 if(loading)return <Loading/>;
 return <Layout><h1>Manage Requests</h1>{error&&<div className="alert error">{error}</div>}<div className="table-wrap panel"><table><thead><tr><th>Student</th><th>Subject</th><th>Category</th><th>Assign Staff</th><th>Status</th></tr></thead><tbody>{rows.map(r=><tr key={r._id}><td>{r.student?.name}</td><td>{r.subject}</td><td>{r.category?.name}</td><td><select value={r.assignedStaff?._id||""} onChange={e=>assign(r._id,e.target.value)}><option value="">Unassigned</option>{staff.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}</select></td><td><select value={r.status} onChange={e=>status(r._id,e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></td></tr>)}</tbody></table>{!rows.length&&<div className="empty">No requests.</div>}</div></Layout>;
}