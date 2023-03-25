import dbConnect from "@/lib/mongoDb";
import InstitueModel from "@/models/Institute";
import bcrypt from "bcrypt";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { InstituteId, NewPassword } = req.query;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(NewPassword, salt);
      await InstitueModel.findOneAndUpdate(
        { _id: InstituteId },
        {
          password: hash,
        }
      );

      return res.status(200).send({ message: "Password updated successfully" });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export default handler;
