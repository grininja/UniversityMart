import mongoose from "mongoose";
const { Schema } = mongoose;

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    index: true,
  },
  Institute: {
    type: Schema.Types.ObjectId,
    ref: "Institute",
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
