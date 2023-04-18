import dbConnect from "@/lib/mongoDb";
import AdminOneModel from "@/models/adminOne";
import UserModel from "@/models/User";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { EmailId } = req.query;
      const person = await UserModel.findOne({ email: EmailId });

      var adminOneResponse = null;
      if (person !== null) {
        adminOneResponse = await AdminOneModel.findOne({ user: person._id });
      }
      return res.status(200).send({ message: adminOneResponse });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "something went wrong" });
  }
};

export default handler;
