import dbConnect from "@/lib/mongoDb";
import ChatSessionModel from "@/models/chatSession";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { SellerId } = req.query;
      const Chats = await ChatSessionModel.find({
        seller: SellerId,
        response: { $ne: "" },
      }).sort({ createdAt: -1 });
      return res.status(200).send({ message: Chats });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    return res.status(500).send({ message: "something went wrong" });
  }
};

export default handler;
