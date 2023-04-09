import dbConnect from "@/lib/mongoDb";
import OrderRequestAdminTwo from "@/models/OrderReqAdminTwo";
import chatSessionModel from "@/models/chatSession";

const handler = async (req, res) => {
  try {
    if (req.method == "GET") {
      await dbConnect();
      const { OrderId } = req.query;
      const result = await OrderRequestAdminTwo.findOne({ _id: OrderId });
      const queries = await chatSessionModel.find({
        item: result.Product,
      });
    
      return res.status(200).send({ message: queries });
    } else {
      return res.status(404).send({ message: "Bad Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "some error occured" });
  }
};


export default handler;