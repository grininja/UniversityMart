import mongoose from "mongoose";
const { Schema } = mongoose;
const OrderRequestAdminTwo = new Schema({
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
    default:"",
  },
  Status: {
    type: String,
    default: "pending",
    index: true,
  },
});

const OrderRequestAdminTwoModel =
  mongoose.models.OrderRequestAdminTwo ||
  mongoose.model("OrderRequestAdminTwo", OrderRequestAdminTwo);
module.exports = OrderRequestAdminTwoModel;
