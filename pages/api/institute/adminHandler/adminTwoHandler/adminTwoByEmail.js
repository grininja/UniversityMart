import dbConnect from "@/lib/mongoDb";
import AdminTwoModel from "@/models/adminTwo";
import UserModel from "@/models/User";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { AdminTwoEmail } = req.query;
      console.log(AdminTwoEmail);
      const userFind = await UserModel.findOne({ email: AdminTwoEmail });

      var AdminTwoPerson = null;
      if (userFind !== null) {
        AdminTwoPerson = await AdminTwoModel.findOne({ user: userFind._id });
      }
      return res.status(200).send({ message: AdminTwoPerson });
    } else {
      return res.status(404).send({ message: "Invalid method" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Some error  occurred" });
  }
};

export default handler;
