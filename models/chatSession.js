import mongoose from "mongoose";
const { Schema } = mongoose;

export const ChatSession = new Schema({
  question: {
    item: {
      type: Schema.Types.ObjectId,
      ref: "SellerProduct",
    },
    quantity: Number,
  },
  response: String,
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "AdminTwo",
  },
});

const chatModel =mongoose.models.chatModel || mongoose.model("ChatSession", ChatSession);
module.exports=chatModel;

