import dbConnect from "@/lib/mongoDb";
import SellerProduct from "@/models/SellerProduct";

const handler = async (req, res) => {
  try {
    if (req.method == "GET") {
      const { sellerId } = req.query;
      const getAllProductsArray = await SellerProduct.find({
        Seller: sellerId,
        visible: true,
      });
      return res.status(200).send({ message: getAllProductsArray });
    } else {
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("exception occured in listing all products ", e);
  }
};

export default handler;
