import dbConnect from "@/lib/mongoDb";
import ChatSessionModel from "@/models/chatSession";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export default handler;
