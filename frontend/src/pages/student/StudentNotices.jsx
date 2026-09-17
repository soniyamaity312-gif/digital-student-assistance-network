import React, { useEffect,useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function StudentNotices(){
 const [data,setData]=useState([]),[loading,setLoading]=useState(true);
 useEffect(()=>{api.get("/notices").then(r=>setData(r.data)).finally(()=>setLoading(false))},[]);
 if(loading)return <Loading/>;
 return <Layout><h1>Notices & Announcements</h1><p className="muted">Latest notices for students.</p><div className="grid3">{data.map(n=><article className="card" key={n._id}><h2>{n.title}</h2><p>{n.description}</p><small>{new Date(n.createdAt).toLocaleString()}</small></article>)}</div>{!data.length&&<div className="panel empty">No notices available.</div>}</Layout>;
}