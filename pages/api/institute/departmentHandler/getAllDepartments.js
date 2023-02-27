import dbConnect from "@/lib/mongoDb";
import Department from "@/models/departMent";
import mongoose from "mongoose";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { InstituteId } = req.query;
      const allDepartment = await Department.find({
        Institute: mongoose.Types.ObjectId(InstituteId),
      });
      return res.status(200).send({ message: allDepartment });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "Some exception occurred" });
  }
};

export default handler;