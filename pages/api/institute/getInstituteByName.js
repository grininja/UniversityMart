import dbConnect from "@/lib/mongoDb";
import Institute from "@/models/Institute";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { name } = req.query;
      // console.log(name);
      const instituteRes = await Institute.findOne({ name: name });
      // console.log(instituteRes);
      return res.status(200).send({ message: instituteRes._id });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log("exception occcured while getting all instutes", e);
    return res.status(404).send({ message: "Some exception occured" });
  }
};

export default handler;
