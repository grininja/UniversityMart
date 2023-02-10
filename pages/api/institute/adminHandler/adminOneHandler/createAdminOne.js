import dbConnect from "@/lib/mongoDb";
import adminOne from "@/models/adminOne";
import User from "@/models/User";
import Institutemodel from "@/models/Institute";

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      await dbConnect();
      const { userId, instituteId, departMent } = req.body;
      const findUser = await User.findById(userId);
      // console.log(findUser);
      if (findUser !== null && findUser.Institute.toString() === instituteId) {
        //check if user is already admin
        const isAlreadyAdmin = await Institutemodel.find({ admin1: userId });
        // console.log(isAlreadyAdmin);
        if (isAlreadyAdmin !== null && isAlreadyAdmin.length > 0) {
          return res.status(404).send({ message: "Already admin" });
        }
        const addAdminOne = await Institutemodel.updateOne(
          { _id: instituteId },
          { $push: { admin1: userId } }
        );

        //create admin one
        // console.log(instituteId);
        const createAdminOne = new adminOne({
          user: userId,
          department: departMent,
          Institute: instituteId,
        });

        await createAdminOne.save();

        return res.status(200).send({ message: "Admin updated" });
      } else {
        return res.status(404).send({ message: "User not exists" });
      }
    } else {
      return res.status(400).return({ message: "invalid request" });
    }
  } catch (e) {
    console.log("error occures in createadminone api " + e);
  }
};

export default handler;
