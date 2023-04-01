import dbConnect from "@/lib/mongoDb";
import InstitueModel from "@/models/Institute";
import SendMail from "@/helper/sendMail";
import bcrypt from "bcrypt";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { InstituteEmail } = req.query;
      const saltRounds = 10;
      const password = Math.random().toString(36).slice(-8);
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      // console.log(password)
      const Institute = await InstitueModel.findOne({ email: InstituteEmail });
      //   console.log(Institute)
      if (Institute !== null) {
        await InstitueModel.findOneAndUpdate(
          { _id: Institute._id },
          {
            password: hash,
          }
        );
        await SendMail(
          InstituteEmail,
          "New Password",
          `Your New Password: ${password}`
        );
      } else {
        return res.status(200).send({ message: "No Institute found" });
      }
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
