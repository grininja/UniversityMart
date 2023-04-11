import mongoose from "mongoose";
const { Schema } = mongoose;
const OrderRequestAdminTwoSchema = new Schema({
  Product: {
    type: Schema.Types.ObjectId,
    ref: "SellerProduct",
    required: true,
  },
  Quantity: {
    type: Schema.Types.Number,
    required: true,
  },
  Institute: {
    type: Schema.Types.ObjectId,
    ref: "Institute",
  },

  Buyer: {
    type: Schema.Types.ObjectId,
    ref: "AdminOne",
  },
  Seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },

  RemarksSeller: {
    type: String,
    default: "",
  },
  Status: {
    type: String,
    default: "pending",
    index: true,
  },
  PaymentActivated: {
    type: Boolean,
    default: false,
  },
  ExpectedDelivery: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const OrderRequestAdminTwoModel =
  mongoose.models.OrderRequestAdminTwo ||
  mongoose.model("OrderRequestAdminTwo", OrderRequestAdminTwoSchema);
module.exports = OrderRequestAdminTwoModel;
