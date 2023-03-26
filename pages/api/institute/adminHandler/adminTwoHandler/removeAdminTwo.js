import dbConnect from "@/lib/mongoDb";
import AdminTwoModel from "@/models/adminTwo";
import InstituteModel from "@/models/Institute";

const handler = async (req, res) => {
  try {
    if (req.method == "GET") {
      await dbConnect();
      const { userId, InstituteId } = req.query;
      await InstituteModel.updateOne(
        { Institute: InstituteId },
        {
          $pullAll: {
            admin2: [userId],
          },
        }
      );
      const finditem = await AdminTwoModel
        .findOneAndDelete({
          user: userId,
          Institute: InstituteId,
        })
      res.status(200).send({ message: "admin removed successfully" });
    } else {
      return res.status(404).send({ message: "Invalid request method" });
    }
  } catch (e) {
    console.log("exception occurred in remove admintwo ", e);
  }
};

export default handler;