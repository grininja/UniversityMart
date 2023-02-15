import mongoose from "mongoose";
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
  name: {
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

const Department =
  mongoose.models.Department || mongoose.model("Department", DepartmentSchema);


module.exports = Department;
