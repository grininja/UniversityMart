import dbConnect from "@/lib/mongoDb";
import AdminTwoRequestModel from "@/models/OrderReqAdminTwo";
import SellerProductModel from "@/models/SellerProduct";
import SellerModel from "@/models/Seller";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { OrderRequestId, InstituteId } = req.query;
      const result = await AdminTwoRequestModel.findById(OrderRequestId);

      if (result !== null) {
        const productDetails = await SellerProductModel.findById(
          result.Product
        );
        const sellerDetail = await SellerModel.findById(result.Seller);
        const finalresult = {
          product_detail: {
            name: productDetails.name,
            description: productDetails.description,
            category: productDetails.category,
            price: productDetails.price,
            photo: productDetails.productImageUrl,
          },
          order_details: {
            quantity: result.Quantity,
            remarksSeller: result.RemarksSeller,
            status: result.Status,
          },
          seller_details: {
            name: sellerDetail.name,
            email: sellerDetail.email,
            phone: sellerDetail.phone,
            address: sellerDetail.address,
            gstin: sellerDetail.gstin,
          },
        };
        return res.status(200).send({ message: finalresult });
      }
      return res.status(200).send({ message: null });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Some exception occurred" });
  }
};

export default handler;
