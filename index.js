const express = require("express");
const app = express();
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const cors = require("cors");
app.use(
  cors({
    origin: [
      "https://product-crud-umber.vercel.app", // your frontend
      "http://localhost:5173", // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
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
