const Product = require("../models/productModels");

//business logic

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    if (allProducts.length === 0) {
      return res.json({
        message: "There is No Product",
      });
    }
    //if we have products >= 1
    res.status(200).json({
      success: true,
      products: allProducts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newProduct = new Product({ name, price, description, category });
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    console.error("Create Product Error:", err); // log the actual error!
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message, // optional: provide error message for easier debugging
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        category,
      },
      { new: true }
    );
    res.status(200).json({ product: updatedProduct });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteUpdated = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Deleted Successfully", product: deleteProduct });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = { getProducts, createProduct, updateProduct, deleteUpdated };
