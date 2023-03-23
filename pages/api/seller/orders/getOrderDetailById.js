import dbConnect from "@/lib/mongoDb";
import OrderReqAdminTwoModel from "@/models/OrderReqAdminTwo";
import SellerModel from "@/models/Seller";
import InstituteModel from "@/models/Institute";
import SellerProduct from "@/models/SellerProduct";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { SellerId, OrderId } = req.query;
      //   console.log(SellerId,OrderId)
      const findOrderRequest = await OrderReqAdminTwoModel.findOne({
        Seller: SellerId,
        _id: OrderId,
      });

      const instituteDetail = await InstituteModel.findOne({
        _id: findOrderRequest.Institute,
      });
      const productInfo = await SellerProduct.findOne({
        _id: findOrderRequest.Product,
      });
      const newInfo = {
        InstituteDetail: {
          name: instituteDetail.name,
          email: instituteDetail.email,
          phone: instituteDetail.phone,
          address: instituteDetail.address,
        },
        OrderDetail: {
          id: OrderId,
          name: productInfo.name,
          description: productInfo.description,
          category: productInfo.category,
          price: productInfo.price,
          photoUrl: productInfo.productImageUrl,
          quantity: findOrderRequest.Quantity,
          status: findOrderRequest.Status,
        },
      };
      return res.status(200).send({ message: newInfo });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

export default handler;
