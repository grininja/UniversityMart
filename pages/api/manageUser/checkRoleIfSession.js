import dbConnect from "@/lib/mongoDb";
import AdminOneModel from "@/models/adminOne";
import AdminTwoModel from "@/models/adminTwo";
import UserModel from "@/models/User";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { emailId } = req.query;
      const findUser = await UserModel.findOne({ email: emailId });
      if (findUser !== null) {
        const isAdmin1 = await AdminOneModel.findOne({ user: findUser._id });
        if (isAdmin1 !== null) {
          return res.status(200).send({ message: "admin1" });
        }
        const isAdmin2 = await AdminTwoModel.findOne({ user: findUser._id });
        if (isAdmin2 !== null) {
          return res.status(200).send({ message: "admin2" });
        }
      }
      return res.status(200).send({ message: "notadmin" });
    } else {
      return res.status(404).send({ message: "Bad request" });
    }
  } catch (err) {
    // console.log(err);
    return res.status(500).send({ message: "something went wrong" });
  }
};

export default handler;
