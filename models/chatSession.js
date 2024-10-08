import mongoose from "mongoose";
const { Schema } = mongoose;

const ChatSessionSchema = new Schema(
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
    response: {
      type: String,
      default: "",
    },
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

const ChatModel =
  mongoose.models.ChatSession || mongoose.model("ChatSession", ChatSessionSchema);
module.exports = ChatModel;
