const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaE2BltUbxcYgIL1vgkYLToA4xb5wOmq6fZA&s",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books", // ✅ collection name should match your Book model
      },
    ],

    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
      },
    ],

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
