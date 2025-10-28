import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [noProducts, setNoProducts] = useState(false);
  const [product, setProducts] = useState([]);
  const [form, SetForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  //Get
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://product-crud-1-cawf.onrender.com/api/products"
      );
      const data = res.data;
      if (data.success && data.products) {
        setProducts(data.products);
        setNoProducts(false);
      } else {
        setProducts([]);
        setNoProducts(true);
      }
    } catch (err) {
      toast.error("Failed to fetch products 😢");
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function handleClick(e) {
    SetForm({ ...form, [e.target.name]: e.target.value });
  }

  //Post
  const postData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://product-crud-1-cawf.onrender.com/api/products",
        form
      );
      toast.success("Product added successfully 🎉");
      await getData();
      SetForm({ name: "", price: "", description: "", category: "" });
    } catch (err) {
      toast.error("Failed to add product ❌");
      console.error(err);
    }
  };

  //Delete
  const deleteData = async (id) => {
    try {
      await axios.delete(
        `https://product-crud-1-cawf.onrender.com/api/products/${id}`
      );
      toast.success("Product deleted 🗑️");
      await getData();
    } catch (err) {
      toast.error("Failed to delete product ❌");
      console.error(err);
    }
  };

  //Update
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://product-crud-1-cawf.onrender.com/api/products/${currentId}`,
        form
      );
      toast.success("Product updated ✏️");
      await getData();
      SetForm({
        name: "",
        price: "",
        description: "",
        category: "",
      });
      setEditMode(false);
      setCurrentId(null);
    } catch (err) {
      toast.error("Failed to update product ❌");
      console.error(err);
    }
  };

  const handleEdit = (items) => {
    SetForm({
      name: items.name,
      price: items.price,
      description: items.description,
      category: items.category,
    });
    setEditMode(true);
    setCurrentId(items._id);
  };

  return (
    <>
      <Toaster position="top-center" />
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>📦 Products</h1>

      <div>
        <form onSubmit={editMode ? updateProduct : postData}>
          <label>Name :- </label>
          <input
            placeholder="Name here"
            name="name"
            value={form.name}
            required
            onChange={handleClick}
          />
          <br />
          <br />
          <label>Price :- </label>
          <input
            placeholder="Price here"
            name="price"
            value={form.price}
            required
            onChange={handleClick}
          />
          <br />
          <br />
          <label>Description :- </label>
          <input
            placeholder="Description here"
            name="description"
            value={form.description}
            required
            onChange={handleClick}
          />
          <br />
          <br />
          <label>Category :- </label>
          <input
            placeholder="Category here"
            name="category"
            value={form.category}
            required
            onChange={handleClick}
          />
          <br />
          <br />
          <button type="submit">
            {editMode ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {noProducts && <h1>No Products Found</h1>}
      {product.map((items, index) => (
        <ul key={index}>
          <li>Name : {items.name}</li>
          <li>Price : {items.price}</li>
          <li>Description : {items.description}</li>
          <li>Category : {items.category}</li>
          <button onClick={() => deleteData(items._id)}>Delete</button>
          <button onClick={() => handleEdit(items)}>Edit</button>
        </ul>
      ))}
    </>
  );
}

export default App;
