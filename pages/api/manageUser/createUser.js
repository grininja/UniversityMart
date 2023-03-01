import dbConnect from "@/lib/mongoDb";
import User from "@/models/User";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { emailId, InstituteId } = req.body;
      const firstCheckIfExists = await User.findOne({ email: emailId });
      if (firstCheckIfExists !== null) {
        return res
          .status(200)
          .send({ message: "User created", userId: firstCheckIfExists._id });
      }
      const newUser = new User({ email: emailId, Institute: InstituteId });
      const result = await newUser.save();
      return res
        .status(200)
        .send({ message: "User created", userId: result._id });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "something went wrong" });
  }
};

export default handler;
