import mongoose from "mongoose";
const { Schema } = mongoose;
const AdminTwo = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  chatSessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "ChatSession",
    },
  ],
  Institute: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
});

const AdminTwoModel =
  mongoose.models.AdminTwo || mongoose.model("AdminTwo", AdminTwo);
module.exports = AdminTwoModel;
