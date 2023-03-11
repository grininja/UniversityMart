import mongoose from "mongoose";
const { Schema } = mongoose;

const Seller = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gstin: {
    required: true,
    type: String,
  },
  productListed: [{ type: Schema.Types.ObjectId, ref: "SellerProduct" }],
});

const SellerModel = mongoose.models.Seller || mongoose.model("Seller", Seller);
module.exports = SellerModel;
// export default SellerModel;
