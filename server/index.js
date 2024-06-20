require("dotenv").config();
const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const productRoutes = require("./routes/product.routes");
app.use("/products", productRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// Connection with MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("CONNECTED TO MONGODB"))
  .catch((err) => console.error("Failed to connect to MongoDB"));

// Test API Route
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});
