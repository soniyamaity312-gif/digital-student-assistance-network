import React, { useEffect,useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function AdminDashboard(){
 const [s,setS]=useState({students:0,staff:0,requests:0,pending:0,resolved:0,notices:0}),[loading,setLoading]=useState(true);
 useEffect(()=>{Promise.all([api.get("/users/students"),api.get("/users/staff"),api.get("/requests"),api.get("/notices")]).then(([a,b,c,d])=>setS({students:a.data.length,staff:b.data.length,requests:c.data.length,pending:c.data.filter(x=>x.status==="Pending").length,resolved:c.data.filter(x=>x.status==="Resolved").length,notices:d.data.length})).finally(()=>setLoading(false))},[]);
 if(loading)return <Loading/>;
 return <Layout><h1>Admin Dashboard</h1><p className="muted">System overview.</p><div className="stats"><div className="stat"><span>Total Students</span><b>{s.students}</b></div><div className="stat"><span>Total Staff</span><b>{s.staff}</b></div><div className="stat"><span>Total Requests</span><b>{s.requests}</b></div><div className="stat"><span>Pending</span><b>{s.pending}</b></div><div className="stat"><span>Resolved</span><b>{s.resolved}</b></div><div className="stat"><span>Total Notices</span><b>{s.notices}</b></div></div></Layout>;
}