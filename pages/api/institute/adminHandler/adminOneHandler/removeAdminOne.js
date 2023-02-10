import dbConnect from "@/lib/mongoDb";
import adminOne from "@/models/adminOne";
import InstituteModel from "@/models/Institute";
import mongoose from "mongoose";
const handler = async (req, res) => {
  try {
    if (req.method == "GET") {
      await dbConnect();
      const { userId, InstituteId } = req.query;
      //   console.log(req.query);      console.log(userId, InstituteId);
      await InstituteModel.updateOne(
        { Institute: InstituteId },
        {
          $pullAll: {
            admin1: [userId],
          },
        }
      );

      const finditem = await adminOne
        .findOneAndDelete({
          user: userId,
          Institute: InstituteId,
        })
        .exec();
      //   console.log(finditem);
      res.status(200).send({ message: "admin removed successfully" });
    } else {
      res.status(400).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("error occured in method remove adminOne", e);
  }
};

export default handler;
