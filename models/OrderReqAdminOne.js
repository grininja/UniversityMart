import mongoose from "mongoose";
const { Schema } = mongoose;
const OrderRequestSchema = new Schema({
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
  Department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
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
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const OrderRequestModel =
  mongoose.models.OrderRequest ||
  mongoose.model("OrderRequest", OrderRequestSchema);
module.exports = OrderRequestModel;
