import dbConnect from "@/lib/mongoDb";
import OrderReqAdminTwoModel from "@/models/OrderReqAdminTwo";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { OrderId, AdminTwoId } = req.body;
      await OrderReqAdminTwoModel.findOneAndDelete({
        _id: OrderId,
        Buyer: AdminTwoId,
      });
      return res.status(200).send({ message: "Order deleted successfully" });
    }else{
        return res.status(400).send({message:"Bad request"});
    }
  } catch (e) {
    return res.status(500).send({ message: "something went wrong" });
  }
};

export default handler;
