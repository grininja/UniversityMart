import dbConnect from "@/lib/mongoDb";
import ChatSessionModel from "@/models/ChatSession";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { BuyerId, SellerId, ProductID } = req.query;
      //   console.log(BuyerId,SellerId,ProductID)
      const AllChats = await ChatSessionModel.find({
        item: ProductID,
        buyer: BuyerId,
        seller: SellerId,
      }).sort({ createdAt: -1 });
      return res.status(200).send({ message: AllChats });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    // console.log(e);
    return res.status(500).send({ message: "Some exception occured" });
  }
};

export default handler;
