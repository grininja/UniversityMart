import mongoose from "mongoose";
const { Schema } = mongoose;
import ItemSchema from "./Item";
export const OrderRequest = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  university: {
    type: Schema.Types.ObjectId,
    ref: "Institute",
  },
  adminInitiated: {
    type: Schema.Types.ObjectId,
    ref: "AdminOne",
  },
  tag: {
    type: String,
    defaultValue: "Non-Urgent",
  },
  remarks: [
    {
      text: String,
      person: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  status: {
    type: String,
    default: "Pending",
    index: true,
  },
});

const OrderRequestModel =
  mongoose.models.OrderRequest || mongoose.model("OrderRequest", OrderRequest);
module.exports = OrderRequestModel;
