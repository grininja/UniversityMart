import dbConnect from "@/lib/mongoDb";
import AdminTwoModel from "@/models/adminTwo";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { AdminTwoEmail } = req.query;
      const AdminTwo = await AdminTwoModel.findOne({ email: AdminTwoEmail });
      return res.status(200).send({ message: AdminTwo });
    } else {
      return res.status(404).send({ message: "Invalid method" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Some error  occurred" });
  }
};

export default handler;
