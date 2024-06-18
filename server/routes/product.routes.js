const express = require("express");
const router = express.Router();
const ProductModel = require("../models/products.model");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// Api Routes

// POST AddProduct
router.post("/addproduct", async (req, res) => {
  let products = await ProductModel.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const newProduct = new ProductModel({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({ success: true, name: req.body.name });
    console.log(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = data.user;
      next();
      console.log("after next");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "please authenticate" });
    }
  }
};

// POST Create endpoint for add to Cart
router.post("/addtocart", fetchUser, async (req, res) => {
  try {
    console.log(req.body, req.user);

    const userData = await UserModel.findOne({ _id: req.user.id });

    userData.cartData[req.body.itemId] += 1;

    await UserModel.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    res.status(200).json({ message: "added" });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// POST Create endpoint for remove from Cart

router.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    console.log(req.body, req.user);

    const userData = await UserModel.findOne({ _id: req.user.id });

    if (userData.cartData[req.body.itemId] > 0)
      userData.cartData[req.body.itemId] -= 1;

    await UserModel.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );

    res.status(200).json({ message: "removed" });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// Endpoint to get CartData
router.post("/getcart", fetchUser, async (req, res) => {
  console.log("Get Cart");
  const userData = await UserModel.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// GET all products
router.get("/allproducts", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error getting all products");
  }
});

// GET latest collection

router.get("/newcollection", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    let newCollection = products.slice(1).slice(-8);
    console.log("New COllection fetched");
    res.status(200).send(newCollection);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// GET "popular" in women items

router.get("/popular-women", async (req, res) => {
  try {
    const products = await ProductModel.find({ category: "women" });
    let popularWomen = products.slice(0, 4);
    console.log("Items Women fetched");
    res.status(200).send(popularWomen);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// DELETE Delete(Post Method) one product
router.post("/removeproduct", async (req, res) => {
  try {
    await ProductModel.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.status(200).json({ success: true, name: req.body.name });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
