import dbConnect from "@/lib/mongoDb";
import ChatSessionModel from "@/models/ChatSession";
// import AdminTwoModel from "@/models/adminTwo";
// import SellerModel from "@/models/Seller";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { ItemId, Quantity, BuyerRequest, SellerId, BuyerId } = req.body;
      const createChatSession = new ChatSessionModel({
        item: ItemId,
        question: {
          quantity: Quantity,
          request: BuyerRequest,
        },
        seller: SellerId,
        buyer: BuyerId,
      });
      await createChatSession.save();
      return res.status(200).send({ message: "Query Sent to seller" });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Some exception occured" });
  }
};

export default handler;
