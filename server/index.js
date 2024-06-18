require("dotenv").config();
const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
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

// IMAGE STORAGE HANDLING
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use("/images", express.static(path.join(__dirname, "upload/images")));

app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.file); // Log req.file to check its content
  if (req.file && req.file.filename) {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://ecommerce-project-server.adaptable.app"
        : `http://localhost:${port}`;

    res.json({
      success: 1,
      image_url: `${baseUrl}/images/${req.file.filename}`,
    });
  } else {
    res.json({
      success: 0,
      message: "File upload failed",
    });
  }
});
