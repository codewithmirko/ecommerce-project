const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: String, required: true },
  old_price: { type: String, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
