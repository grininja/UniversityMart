import dbConnect from "@/lib/mongoDb";
import UserModel from "@/models/adminOne";
import AdminOneModel from "@/models/adminOne";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const AdminOnes = await AdminOneModel.find();
      return res.status(200).send({ message: AdminOnes });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "something went wrong" });
  }
};

export default handler;
