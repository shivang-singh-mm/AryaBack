const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: mongoose.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
    amenities: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          ref: "Amenity",
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        _id: false,
      },
    ],
    guest: {
      adult: { type: Number },
      children: { type: Number },
    },
    accomodation: {
      type: String,
      required: true,
    },
    check_in: {
      type: Date,
      required: true,
    },
    check_out: {
      type: Date,
      required: true,
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
    privateRooms:{
      type: Number,
      default: 0
    },
    totalPrice:{
      type:Number,
      required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
