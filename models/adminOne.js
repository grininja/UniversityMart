import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

 const AdminOneSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  Institute: {
    type: Schema.Types.ObjectId,
    ref: "Institute",
    index: true,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  cart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Item", required: true },
      quantity: { type: Number, min: 1, required: true },
    },
  ],
});

const AdminOne =
  mongoose.models.AdminOne || mongoose.model("AdminOne", AdminOneSchema);
module.exports = AdminOne;
