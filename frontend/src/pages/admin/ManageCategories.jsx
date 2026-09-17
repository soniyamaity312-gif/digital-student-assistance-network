import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const loadCategories = async () => {
    try {
      const response =
        await api.get("/admin/categories");

      setCategories(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");

      await api.post(
        "/admin/categories",
        form
      );

      setMessage(
        "Category added successfully."
      );

      setForm({
        name: "",
        description: ""
      });

      loadCategories();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to add category."
      );
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) {
      return;
    }

    try {
      await api.delete(
        `/admin/categories/${id}`
      );

      loadCategories();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete category."
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
          <h1>Categories</h1>
          <p className="muted">
            Manage complaint categories.
          </p>
        </div>
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      {message && (
        <div className="alert success">
          {message}
        </div>
      )}

      <div className="two-col">

        <div className="panel">

          <h2>Add Category</h2>

          <form onSubmit={addCategory}>

            <label>
              Category Name

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
                placeholder="Academic"
              />
            </label>

            <label>
              Description

              <textarea
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value
                  })
                }
                placeholder="Category description"
              />
            </label>

            <button className="btn btn-primary">
              Add Category
            </button>

          </form>

        </div>


        <div className="panel">

          <h2>Categories</h2>

          {categories.length === 0 ? (

            <div className="empty">
              No categories found.
            </div>

          ) : (

            categories.map((category) => (

              <div
                className="list-row"
                key={category._id}
              >

                <div>
                  <strong>
                    {category.name}
                  </strong>

                  <p className="muted">
                    {category.description ||
                      "No description"}
                  </p>
                </div>

                <button
                  className="btn btn-danger btn-small"
                  onClick={() =>
                    deleteCategory(
                      category._id
                    )
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