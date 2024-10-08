import dbConnect from "@/lib/mongoDb";
import UserModel from "@/models/adminOne";
import AdminTwoModel from "@/models/adminTwo";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const AdminTwoPeoples = await AdminTwoModel.find();
      return res.status(200).send({ message: AdminTwoPeoples });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "something went wrong" });
  }
};
