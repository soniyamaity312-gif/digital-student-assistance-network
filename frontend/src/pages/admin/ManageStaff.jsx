import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

const departments = [
  "IT Department",
  "Library",
  "Hostel",
  "Administration",
  "Accounts"
];

export default function ManageStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    phone: ""
  });

  const loadStaff = async () => {
    try {
      const response = await api.get("/admin/staff");
      setStaff(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load staff."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addStaff = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      await api.post("/admin/staff", form);

      setMessage("Staff member added successfully.");

      setForm({
        name: "",
        email: "",
        password: "",
        department: "",
        phone: ""
      });

      loadStaff();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to add staff."
      );
    }
  };

  const deleteStaff = async (id) => {
    if (!window.confirm("Delete this staff member?")) {
      return;
    }

    try {
      await api.delete(`/admin/staff/${id}`);
      loadStaff();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete staff."
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="page-head">
        <div>
          <h1>Manage Staff</h1>
          <p className="muted">
            Add and manage staff members.
          </p>
        </div>
      </div>

      {error && (
        <div className="alert error">{error}</div>
      )}

      {message && (
        <div className="alert success">{message}</div>
      )}

      <div className="two-col">

        <div className="panel">
          <h2>Add Staff</h2>

          <form onSubmit={addStaff}>

            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Staff name"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="staff@college.com"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </label>

            <label>
              Department
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
              >
                <option value="">
                  Select Department
                </option>

                {departments.map((department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Phone
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </label>

            <button
              className="btn btn-primary"
              type="submit"
            >
              Add Staff
            </button>

          </form>
        </div>


        <div className="panel">

          <h2>Staff Members</h2>

          {staff.length === 0 ? (
            <div className="empty">
              No staff members found.
            </div>
          ) : (
            <div className="table-wrap">
              <table>

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {staff.map((member) => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>{member.department}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() =>
                            deleteStaff(member.id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>
    </Layout>
  );
}