import React from "react";
import { Link } from "react-router-dom";

export default function RequestCard({ request, base = "/student/request" }) {
  return <article className="card">
    <div className="card-row"><h3>{request.subject}</h3><span className="status">{request.status}</span></div>
    <p><b>Category:</b> {request.category?.name || "N/A"}</p>
    <p className="muted">{request.description}</p>
    <small>{new Date(request.createdAt).toLocaleString()}</small>
    <div><Link className="btn btn-secondary" to={`${base}/${request._id}`}>View Details</Link></div>
  </article>;
}