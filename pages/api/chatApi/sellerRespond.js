import dbConnect from "@/lib/mongoDb";
import ChatSessionModel from "@/models/chatSession";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { chatSessionId, SellerId, SellerResponse } = req.body;
      const updateChats = await ChatSessionModel.findOneAndUpdate(
        {
          _id: chatSessionId,
          seller: SellerId,
        },
        {
          response: SellerResponse,
        }
      );
      return res.status(200).send({ message: "Chat responded successfully" });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    return res.status(500).send({ message: "something went wrong" });
  }
};

export default handler;