const express = require("express");
const app = express();
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const cors = require("cors");
app.use(
  cors({
    origin: [
      "https://product-crud-umber.vercel.app",
      "http://localhost:5173",
      "http://10.0.2.2", // Android emulator
      "http://localhost", // Android webview
      "*", // optional fallback for testing
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

//load env
dotenv.config();
const port = process.env.PORT;

//connect to database
connectDB();
app.get("/", (req, res) => {
  console.log("I am in GET server");
  res.send("I am in GET route");
});

app.use("/api", productRoutes);
// ->/api/products

app.listen(port, () => {
  console.log(`Product App is running on ${port}`);
});
