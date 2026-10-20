const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ["hoodies", "tees", "outerwear", "pants"],
      default: "hoodies",
    },
    description: { type: String, default: "" },
    images: { type: [String], default: [] },
    color: { type: String, default: "" },
    sizes: [{ type: String, enum: ["M", "L", "XL"] }],
    fit: { type: String, default: "" },
    material: { type: String, default: "" },
    care: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);