import dbConnect from "@/lib/mongoDb";
import User from "@/models/User";
import Institutemodel from "@/models/Institute";
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { name, email, password, phone, Institute } = req.body;
      const isEmailExists = await User.exists({ email: email });
      const isPhoneExists = await User.exists({ phone: phone });
      const checkInstitution = await Institutemodel.findById(Institute);

      if (isEmailExists !== null || isPhoneExists !== null) {
        return res.status(400).send({ message: "User already exists" });
      } else {
        if (checkInstitution === null) {
          return res
            .status(403)
            .send({ message: "No such organisation found" });
        }
        const createUser = new User({
          email: email,
          phone: phone,
          password: password,
          name: name,
          Institute: Institute,
        });
        await createUser.save();
        return res.status(200).send({ message: "User created successfully" });
      }
    } else {
      return res.status(404).send({ message: "invalid request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message:"some error occured" });
  }
};

export default handler;
