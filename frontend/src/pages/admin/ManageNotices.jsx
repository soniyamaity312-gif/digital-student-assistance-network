import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    message: "",
    category: "General"
  });

  const loadNotices = async () => {
    try {
      const response =
        await api.get("/admin/notices");

      setNotices(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load notices."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const createNotice = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      await api.post("/admin/notices", form);

      setMessage("Notice published successfully.");

      setForm({
        title: "",
        message: "",
        category: "General"
      });

      loadNotices();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to create notice."
      );
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) {
      return;
    }

    try {
      await api.delete(`/admin/notices/${id}`);
      loadNotices();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete notice."
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
          <h1>Manage Notices</h1>
          <p className="muted">
            Publish important information for students.
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
          <h2>Create Notice</h2>

          <form onSubmit={createNotice}>

            <label>
              Title
              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value
                  })
                }
                placeholder="Notice title"
              />
            </label>

            <label>
              Category
              <input
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value
                  })
                }
                placeholder="General"
              />
            </label>

            <label>
              Message
              <textarea
                rows="6"
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value
                  })
                }
                placeholder="Write notice..."
              />
            </label>

            <button className="btn btn-primary">
              Publish Notice
            </button>

          </form>
        </div>


        <div className="panel">

          <h2>Published Notices</h2>

          {notices.length === 0 ? (
            <div className="empty">
              No notices published.
            </div>
          ) : (

            notices.map((notice) => (

              <div
                className="list-row"
                key={notice._id}
              >

                <div>
                  <strong>
                    {notice.title}
                  </strong>

                  <p className="muted">
                    {notice.message}
                  </p>

                  <small>
                    {notice.category}
                  </small>
                </div>

                <button
                  className="btn btn-danger btn-small"
                  onClick={() =>
                    deleteNotice(notice._id)
                  }
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </Layout>
  );
}