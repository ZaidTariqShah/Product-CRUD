import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  // 🟢 FETCH PRODUCTS (READ)
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://product-crud-1-cawf.onrender.com/api/products"
      );
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
      } else {
        setProducts([]);
        setError(data.message || "No Products Found");
      }
    } catch {
      setError("Error fetching data");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🟢 ADD OR UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `https://product-crud-1-cawf.onrender.com/api/products/${editId}`
        : "https://product-crud-1-cawf.onrender.com/api/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(editId ? "✏️ Product updated!" : "✅ Product added!");
        setForm({ name: "", price: "", category: "", description: "" });
        setEditId(null);
        await fetchProducts();
      } else {
        toast.error(data.message || "Failed to save product");
      }
    } catch {
      toast.error("Error saving product");
    }
  };

  // ✏️ EDIT PRODUCT
  const handleEdit = (prod) => {
    setForm({
      name: prod.name,
      price: prod.price,
      category: prod.category,
      description: prod.description,
    });
    setEditId(prod._id);
  };

  // 🗑️ DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://product-crud-1-cawf.onrender.com/api/products/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("🗑️ Product deleted!");
        await fetchProducts();
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch {
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="container">
      <h2 className="title">{editId ? "Edit Product" : "Add Product"}</h2>

      {/* 🧾 CREATE / EDIT FORM */}
      <form onSubmit={handleSubmit} className="create-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>
        <button type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* 🟢 SHOW PRODUCTS */}
      {!loading && !error && (
        <div>
          {products.length === 0 ? (
            <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
              There is No Product
            </p>
          ) : (
            products.map((prod) => (
              <div key={prod._id} className="product-card">
                <h3>{prod.name}</h3>
                <p>
                  <strong>Price:</strong> {prod.price}
                </p>
                <p>
                  <strong>Category:</strong> {prod.category}
                </p>
                <p>{prod.description}</p>
                <div className="button-group">
                  <button className="edit-btn" onClick={() => handleEdit(prod)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(prod._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 🔔 Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
