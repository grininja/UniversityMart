import dbConnect from "@/lib/mongoDb";
import OrderReqAdminTwoModel from "@/models/OrderReqAdminTwo";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { OrderId } = req.query;
      await dbConnect();
      var searchValue = await OrderReqAdminTwoModel.findById(OrderId);
      var value = true;
      if (searchValue.PaymentActivated === true) {
        value = false;
      }
      //   console.log(value)
      const checkRes = await OrderReqAdminTwoModel.findOneAndUpdate(
        { _id: OrderId },
        { PaymentActivated: value }
      );
      res.status(200).send({ message: "done" });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "some exception occured" });
  }
};

export default handler;
