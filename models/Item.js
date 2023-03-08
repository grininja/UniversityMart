import mongoose from "mongoose";
const { Schema } = mongoose;

export const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
  },
  photo: {
    type: String,
    // required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: String,
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);
module.exports = Item;
