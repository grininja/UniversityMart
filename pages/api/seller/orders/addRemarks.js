import dbConnect from "@/lib/mongoDb";
import OrderReqAdminTwoModel from "@/models/OrderReqAdminTwo";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { OrderId, SellerId, remarks, TagValue, DeliveryDate } = req.body;

      const findOrder = await OrderReqAdminTwoModel.findOne({ _id: OrderId });
      const remarksfinal = remarks !== "" ? remarks : findOrder.RemarksSeller;
      const statusfinal = TagValue !== "" ? TagValue : findOrder.Status;
      const addRemarks = await OrderReqAdminTwoModel.findOneAndUpdate(
        {
          _id: OrderId,
          Seller: SellerId,
        },
        {
          RemarksSeller: remarksfinal,
          Status: statusfinal,
          ExpectedDelivery: DeliveryDate,
        }
      );
      return res.status(200).send({ message: "Remarks updated successfully" });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    return res.status(500).send({ message: "Somthing went wrong" });
  }
};

export default handler;
