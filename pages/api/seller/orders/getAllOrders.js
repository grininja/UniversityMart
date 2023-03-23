import dbConnect from "@/lib/mongoDb";
import SellerModel from "@/models/Seller";
import OrderReqAdminTwoModel from "@/models/OrderReqAdminTwo";
import InstituteModel from "@/models/Institute";
import AdminTwoModel from "@/models/AdminTwo";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { SellerId } = req.query;
      const allOrders = await OrderReqAdminTwoModel.find({
        Seller: SellerId,
      });
      for (var i = 0; i < allOrders.length; i++) {
        var order = allOrders[i];
        const getAdminTwo = await AdminTwoModel.findById(order.Buyer);
        const getInstitute = await InstituteModel.findById(
          getAdminTwo.Institute
        );
        
      }
      return res.status(200).send({ message: allOrders });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Some exception occurred" });
  }
};
export default handler;
