import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
import ItemSchema from "./Item";
export const AdminOneSchema = new Schema({
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
    type: String,
    required: true,
  },
  cart: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

const AdminOne =
  mongoose.models.AdminOne || mongoose.model("AdminOne", AdminOneSchema);
module.exports = AdminOne;
