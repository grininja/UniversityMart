import dbConnect from "@/lib/mongoDb";
import AdminOneModel from "@/models/adminOne";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
        await dbConnect();
      const { EmailId } = req.query;
      const AdminOne = await AdminOneModel.findOne({ email:EmailId });
      return res.status(200).send({ message: AdminOne });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "something went wrong" });
  }
};

export default handler;
