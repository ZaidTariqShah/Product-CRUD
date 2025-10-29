const express = require("express");
const app = express();
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const cors = require("cors");

const allowedOrigins = [
  "https://product-crud-umber.vercel.app", // your deployed frontend
  "http://localhost:5173", // Vite local dev
  "http://localhost:3000", // CRA local dev (in case)
  "capacitor://localhost", // Capacitor Android/iOS apps
  "http://10.0.2.2:5173", // Android emulator for Vite
  "http://10.0.2.2:3000", // Android emulator for CRA
  "https://localhost", // Android webview with https
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// load env
dotenv.config();
const port = process.env.PORT;

// connect to database
connectDB();

app.get("/", (req, res) => {
  console.log("I am in GET server");
  res.send("I am in GET route");
});

app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`Product App is running on ${port}`);
});
