import dbConnect from "@/lib/mongoDb";
import OrderReqAdminTwoModel from "@/models/OrderReqAdminTwo";
import SellerModel from "@/models/Seller";
import SellerProductModel from "@/models/SellerProduct";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { AdminTwoId } = req.query;
      const AllOrderRequests = await OrderReqAdminTwoModel.find({
        Buyer: AdminTwoId,
      });
      const newRes = [];
      for (var i = 0; i < AllOrderRequests.length; i++) {
        const item = AllOrderRequests[i];
        const aboutItem = await SellerProductModel.findOne({
          _id: item.Product,
        });
        const aboutSeller = await SellerModel.findOne({
          _id: item.Seller,
        });
        // console.log(aboutItem)
        const newDesc = {
          productName: aboutItem.name,
          productPrice: aboutItem.price,
          productDescription: aboutItem.description,
          sellerName: aboutSeller.name,
          OrderId: item._id,
          sellerId: aboutSeller._id,
          OrderStatus: item.Status,
          OrderRemark: item.RemarksSeller,
          orderTotal: item.Quantity * aboutItem.price,
          paymentActivated: item.PaymentActivated,
          productId:item.Product,
          SellerPaymentId:aboutSeller.stripeId,
          totalQuantity: item.Quantity
        };
        newRes.push(newDesc);
      }
      return res.status(200).send({ message: newRes });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "some exception occured" });
  }
};

export default handler;
