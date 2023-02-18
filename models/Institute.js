import mongoose from "mongoose";
const { Schema } = mongoose;

export const InstituteSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  // address: {
  //   street: { type: String, required: true },
  //   city: { type: String, required: true },
  //   state: { type: String, required: true },
  //   zipcode: { type: String, required: true },
  //   country: { type: String, required: true },
  // },
  address: { type: String, required: true},
  admin1: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  admin2: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  admin3: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  departments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  ],
});

const Institute =
  mongoose.models.Institute || mongoose.model("Institute", InstituteSchema);
module.exports = Institute;
