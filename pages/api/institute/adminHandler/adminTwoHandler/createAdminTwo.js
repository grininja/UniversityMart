import dbConnect from "@/lib/mongoDb";
import adminTwo from "@/models/adminTwo";
import Institutemodel from "@/models/Institute";
import User from "@/models/User";
import checkForRoles from "@/helper/checkSingleRole";
const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      await dbConnect();
      const { userId, instituteId } = req.body;
      const findUser = await User.findOne({ _id: userId });
      if (findUser !== null && findUser.Institute.toString() === instituteId) {
        const checkRole = await checkForRoles(findUser._id, findUser.email);
        // console.log(checkRole);
        if (checkRole === false) {
          return res
            .status(200)
            .send({ message: "Already assigned some role" });
        }

        const isAlreadyAdmin = await Institutemodel.find({ admin2: userId });
        if (isAlreadyAdmin !== null && isAlreadyAdmin.length > 0) {
          return res.status(200).send({ message: "Already admin" });
        }
        const addAdminTwo = await Institutemodel.updateOne(
          { _id: instituteId },
          { $push: { admin2: userId } }
        );

        const createAdminTwo = new adminTwo({
          user: userId,
          Institute: instituteId,
        });
        await createAdminTwo.save();
        return res.status(200).send({ message: "user added as admin2" });
      } else {
        return res.status(404).send({ message: "User not exists" });
      }
    } else {
      return res.status(400).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("error occured in create admin two request ", e);
  }
};

export default handler;
