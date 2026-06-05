const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true
    },
    model: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    ram: {
      type: String, 
      required: true
    },
    rom: {
      type: String, 
      required: true
    },
    status: {
      type: String,
      enum: ["active", "deactivate"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;