import dbConnect from "@/lib/mongoDb";
import apiCall from "@/helper/apiCall";
import OrderReqAdminOneModel from "@/models/OrderReqAdminOne";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
        await dbConnect();

      const { OrderId, InstituteId } = req.query;
    //   console.log(OrderId,InstituteId);
      const Order = await OrderReqAdminOneModel.findOne({
        _id: OrderId,
        Institute: InstituteId,
      });
    //   console.log(Order);
      return res.status(200).send({ message: Order });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Some error occurred" });
  }
};

export default handler;
