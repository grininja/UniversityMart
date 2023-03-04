import dbConnect from "@/lib/mongoDb";
import UserModel from "@/models/User";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { email } = req.params;
      const allUsers = await UserModel.find({ email: email });
      return res.status(200).send({ message: allUsers });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "Something went wrong" });
  }
};

export default handler;
