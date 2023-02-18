import dbConnect from "@/lib/mongoDb";
import Institute from "@/models/Institute";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const allInstitutes = await Institute.find();
      return res.status(200).send({ message: allInstitutes });
    } else {
      return res.status(400).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("exception occcured while getting all instutes", e);
    return res.status(404).send({ message: "Some exception occured" });
  }
};

export default handler;
