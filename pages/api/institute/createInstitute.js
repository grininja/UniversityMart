import dbConnect from "@/lib/mongoDb";
import Institute from "@/models/Institute";
const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      await dbConnect();
      const { name, email, password, phone, address } = req.body;
      const check1 = await Institute.exists({ email: email });
      const check2 = await Institute.exists({ name: name });
      console.log(check1, check2);
      if (check1 !== null || check2 !== null) {
        return res.status(400).send({ message: "Institute already exists" });
      } else {
        const createInstitute = new Institute({
          name,
          email,
          password,
          phone,
          address,
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
  }
};

export default handler;
