import dbConnect from "@/lib/mongoDb";
import Institute from "@/models/Institute";
import User from "@/models/User";
import mongoose from "mongoose";
const handler = async (req, res) => {
  try {
    if ((req.method = "GET")) {
      await dbConnect();
      const { instituteName, adminEmail, role } = req.query;
      // console.log(instituteName, role, adminEmail);
      const user = await User.findOne({ email: adminEmail });

      // console.log(user);
      if (user) {
        const id = user._id;
        // console.log(id);
        if (role === "admin1") {
          const searchAdmin1 = await Institute.findOne({
            name: instituteName.toLowerCase(),
            admin1: { $in: [id] },
          });
          console.log(searchAdmin1);
          if (searchAdmin1 !== null) {
            return res.status(200).send({ message: true });
          }
        } else if (role === "admin2") {
          const searchAdmin2 = await Institute.findOne({
            name: instituteName.toLowerCase(),
            admin2: { $in: [id] },
          });
          if (searchAdmin2 !== null) {
            return res.status(200).send({ message: true });
          }
        } else if (role === "admin3") {
          const searchAdmin3 = await Institute.findOne({
            name: instituteName.toLowerCase(),
            admin3: { $in: [id] },
          });
          if (searchAdmin3 !== null) {
            return res.status(200).send({ message: true });
          }
        }
        return res.status(200).send({ message: false });
      } else {
        return res.status(200).send({ message: false });
      }
    } else {
      return res.status(500).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something went wrong" });
  }
};

export default handler;
