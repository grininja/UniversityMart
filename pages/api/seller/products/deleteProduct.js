import dbConnect from "@/lib/mongoDb";
import SellerProduct from "@/models/SellerProduct";
import mongoose from "mongoose";
const handler = async (req, res) => {
  try {
    if (req.method == "GET") {
      await dbConnect();
      const { sellerId, productId } = req.query;
      const findProductAndDelete = await SellerProduct.findOneAndDelete({
        _id: productId,
        Seller: sellerId,
      });
      return res.status(200).send({ message: "product removed successfully" });
    } else {
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("exception occured in deleting product ", e);
  }
};

export default handler;
