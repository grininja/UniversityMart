import dbConnect from "@/lib/mongoDb";
import Institute from "@/models/Institute";
import bcrypt from "bcrypt";
const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      await dbConnect();
      const { name, email, password, phone, address, affliationCode } =
        req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      const check1 = await Institute.exists({ email: email });
      const check2 = await Institute.exists({ name: name });
      const check3 = await Institute.exists({ phone: phone });
      // console.log(check1, check2);
      if (check1 !== null || check2 !== null || check3 !== null) {
        return res.status(200).send({ message: "Institute already exists" });
      } else {
        const createInstitute = new Institute({
          name,
          email,
          password: hash,
          phone,
          address,
          affliationcode: affliationCode,
        });
        await createInstitute.save();
        return res
          .status(200)
          .send({ message: "Institute created successfully" });
      }
    } else {
      res.status(400).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.error("api create institute thrown " + e);
    return res.status(500).send({ message: "some error occured" });
  }
};

export default handler;
