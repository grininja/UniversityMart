import dbConnect from "@/lib/mongoDb";
import adminOne from "@/models/adminOne";
import User from "@/models/User";
import Institutemodel from "@/models/Institute";

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      await dbConnect();
      const { userId, instituteId, departMent } = req.body;
      console.log(userId, instituteId, departMent);
      const findUser = await User.findOne({_id:userId});
      if (findUser !== null && findUser.Institute.toString() === instituteId) {
        const isAlreadyAdmin = await Institutemodel.find({ admin1: userId });
        if (isAlreadyAdmin !== null && isAlreadyAdmin.length > 0) {
          return res.status(200).send({ message: "Already admin" });
        }
        const addAdminOne = await Institutemodel.updateOne(
          { _id: instituteId },
          { $push: { admin1: userId } }
        );

        const createAdminOne = new adminOne({
          user: userId,
          department: departMent,
          Institute: instituteId,
        });

        await createAdminOne.save();

        return res.status(200).send({ message: "Admin updated" });
      } else {
        return res.status(200).send({ message: "User not exists" });
      }
    } else {
      return res.status(400).return({ message: "invalid request" });
    }
  } catch (e) {
    console.log("error occures in createadminone api " + e);
    return res.status(500).send({ message: "some error occured" });
  }
};

export default handler;
