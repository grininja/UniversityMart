import mongoose from "mongoose";
const { Schema } = mongoose;
export const SellerProduct = new Schema({
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
  price: [
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
  productImage: {
    type: String,
    required: true,
  },
});

const SellerProductModel = mongoose.models.SellerProduct || mongoose.model("SellerProduct", SellerProduct);
module.exports=SellerProductModel;

