import mongoose from "mongoose";
const { Schema } = mongoose;
const AdminTwoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },

  Institute: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
});

const AdminTwoModel =
  mongoose.models.AdminTwo || mongoose.model("AdminTwo", AdminTwoSchema);
module.exports = AdminTwoModel;
