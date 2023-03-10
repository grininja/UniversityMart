import mongoose from "mongoose";
const { Schema } = mongoose;
import ItemSchema from "./Item";
export const OrderRequest = new Schema({
  products: [
    {
      detail: {
        itemId: { type: Schema.Types.ObjectId, ref: "Item" },
        category: { type: String, required: true },
        department: { type: Schema.Types.ObjectId, ref: "Department" },
        name: { type: Schema.Types.String, required: true },
        photo: { type: Schema.Types.String },
      },
      quantity: { type: Schema.Types.Number, required: true },
    },
  ],
  Institute: {
    type: Schema.Types.ObjectId,
    ref: "Institute",
  },
  Department:{
    type:Schema.Types.ObjectId,
    ref:"Department",
  },
  adminInitiated: {
    type: Schema.Types.ObjectId,
    ref: "AdminOne",
  },
  tag: {
    type: String,
    defaultValue: "Non-Urgent",
  },

  remarksAdminOne: {
    type: String,
  },
  remarksAdminTwo: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending",
    index: true,
  },
});

const OrderRequestModel =
  mongoose.models.OrderRequest || mongoose.model("OrderRequest", OrderRequest);
module.exports = OrderRequestModel;
