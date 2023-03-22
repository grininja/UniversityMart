import dbConnect from "@/lib/mongoDb";
import OrderReqAdminTwoModel from "@/models/OrderReqAdminTwo";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
        await dbConnect();
      const { OrderId, SellerId, remarks } = req.query;
      //can only add remarks one time after that non updatable
      const addRemarks = await OrderReqAdminTwoModel.findOneAndUpdate(
        {
          _id: OrderId,
          Seller: SellerId,
          RemarksSeller:""
        },
        {
          RemarksSeller: remarks,
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