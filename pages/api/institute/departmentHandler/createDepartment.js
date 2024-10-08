import dbConnect from "@/lib/mongoDb";
import Department from "@/models/departMent";
import InstituteModel from "@/models/Institute";
import mongoose from "mongoose";
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { name, instituteId } = req.body;
      // console.log(name,instituteId)
      const checkIfInstituteExists = await InstituteModel.find({
        _id: mongoose.Types.ObjectId(instituteId),
      });
      if (
        checkIfInstituteExists !== null &&
        checkIfInstituteExists.length === 0
      ) {
        return res.status(400).send({ message: "Institute does not exist" });
      }
      const checkIfExists = await Department.find({
        name: name,
        Institute: mongoose.Types.ObjectId(instituteId),
      });
      if (checkIfExists !== null && checkIfExists.length > 0) {
        return res.status(200).send({ message: "Department already exists" });
      }
      const createDepartment = new Department({
        name: name,
        Institute: mongoose.Types.ObjectId(instituteId),
      });
      const newDepartment = await createDepartment.save();
      const addDepartment = await InstituteModel.updateOne(
        { _id: instituteId },
        { $push: { departments: newDepartment._id } }
      );
      return res
        .status(200)
        .send({ message: "Department created successfully" });
    } else {
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("Exception occuredd while creating department", e);
    return res.status(500).send({ message: "some error" });
  }
};

export default handler;
