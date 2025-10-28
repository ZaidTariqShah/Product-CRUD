import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  // 🟢 FETCH PRODUCTS (READ)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://product-crud-1-cawf.onrender.com/api/products"
        );
        const data = res.data;
        if (data.success && data.products) {
          setProducts(data.products);
        } else {
          setError(data.message || "No Products Found");
        }
      } catch {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🟢 CREATE PRODUCT (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://product-crud-1-cawf.onrender.com/api/products",
        form
      );
      const data = res.data;
      alert("✅ Product added successfully!");
      setProducts([...products, data.product]);
      setForm({ name: "", price: "", category: "", description: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Products</h2>

      {/* 🧾 CREATE FORM */}
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
        <button type="submit">Add Product</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* 🟢 SHOW PRODUCTS */}
      {!loading && !error && (
        <div>
          {products.map((prod) => (
            <div key={prod._id} className="product-card">
              <h3>{prod.name}</h3>
              <p>
                <strong>Price:</strong> {prod.price}
              </p>
              <p>
                <strong>Category:</strong> {prod.category}
              </p>
              <p>{prod.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
