import mongoose from "mongoose";
const { Schema } = mongoose;
//for seller ther is no first name and last name like goyal traders and marketing limited
const Seller = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: { type: Number, required: true },
  },
  gstin: {
    required: true,
    type: String,
  },
  productListed: [{ type: Schema.Types.ObjectId, ref: "SellerProduct" }],
});

const SellerModel = mongoose.models.Seller || mongoose.model("Seller", Seller);
module.exports=SellerModel;
// export default SellerModel;
