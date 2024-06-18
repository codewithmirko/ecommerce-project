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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./upload/images";
    console.log(`Setting upload destination to: ${uploadPath}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `${file.fieldname}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    console.log(`Generated filename: ${filename}`);
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(`Received file: ${file.originalname}`);
    cb(null, true);
  },
});

// Serve static files from the 'upload/images' directory
app.use("/images", express.static(path.join(__dirname, "upload/images")));

app.post("/upload", upload.single("product"), (req, res) => {
  console.log("Received POST request on /upload");
  if (req.file) {
    console.log("File details:", req.file);
    const imageUrl = `https://ecommerce-project-server.adaptable.app/images/${req.file.filename}`;
    console.log(`File uploaded successfully. Access it at: ${imageUrl}`);
    res.json({
      success: 1,
      image_url: imageUrl,
    });
  } else {
    console.log("File upload failed. No file received.");
    res.json({
      success: 0,
      message: "File upload failed",
    });
  }
});
