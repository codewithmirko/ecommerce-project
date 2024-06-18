const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Routes

// SIGNUP

router.post("/signup", async (req, res) => {
  console.log("hello");
  const check = await UserModel.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, error: "User already exists" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const salt = bcrypt.genSaltSync(11);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);

  try {
    const user = await new UserModel({
      name: req.body.username,
      email: req.body.email,
      password: passwordHash,
      cartData: cart,
    });
    console.log(user);
    await user.save();
    res.status(200).json({ message: "User created succesfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const potentialUser = await UserModel.findOne({ email: req.body.email });
    if (potentialUser) {
      if (bcrypt.compareSync(req.body.password, potentialUser.password)) {
        const data = {
          user: {
            id: potentialUser.id,
          },
        };
        const authToken = jwt.sign(data, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ success: true, token: authToken });
      } else {
        res.status(400).json("Incorrect Password");
      }
    } else {
      ("No user with this username");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error login in");
  }
});

module.exports = router;
