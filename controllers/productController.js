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
    const newProducts = new Product({ name, price, description, category });
    await newProducts.save();
    res.status(200).json({ product: newProducts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
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
  res.status(200).json({ product: updateProduct });

  try {
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
