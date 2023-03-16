import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSession = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "SellerProduct",
      required: true,
    },
    question: {
      quantity: { type: Schema.Types.Number, required: true },
      request: String,
    },
    response: String,
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "AdminTwo",
      required: true,
    },
  },
  { timestamps: true }
);

const chatModel =
  mongoose.models.ChatSession || mongoose.model("ChatSession", ChatSession);
module.exports = chatModel;
