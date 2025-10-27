import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
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

  return (
    <div className="container">
      <h2 className="title">Products</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
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
