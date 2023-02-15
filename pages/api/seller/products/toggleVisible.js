import mongoose from "mongoose";
import SellerProduct from "@/models/SellerProduct";
import dbConnect from "@/lib/mongoDb";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { productId, sellerId } = req.query;
      const product = await SellerProduct.find({
        _id: productId,
        Seller: sellerId,
      });
      if (product !== null && product.length > 0) {
        if (product[0].visible == true) {
          const updateVisibility = await SellerProduct.findOneAndUpdate(
            { _id: productId, Seller: sellerId },
            {
              visible: false,
            }
          );
        } else {
          const updateVisibility = await SellerProduct.findOneAndUpdate(
            { _id: productId, Seller: sellerId },
            {
              visible: true,
            }
          );
        }
        return res.status(200).send({ message: "Visibility updated" });
      } else {
        return res.status(400).send({ message: "Product not found" });
      }
    } else {
      return res.status(404).send({ message: "Invalid Request" });
    }
  } catch (e) {
    console.log("Exception caught: " + e);
    return res.status(500).send({ message:"some error occured" });
  }
};


export default handler;