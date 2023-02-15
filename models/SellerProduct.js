import mongoose from "mongoose";
const { Schema } = mongoose;
const SellerProduct = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  priceList: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  productImageUrl: {
    type: String,
    required: true,
  },
  Seller: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Seller",
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

SellerProduct.index({ name: "text", description: "text" });

const SellerProductModel =
  mongoose.models.SellerProduct ||
  mongoose.model("SellerProduct", SellerProduct);
module.exports = SellerProductModel;
