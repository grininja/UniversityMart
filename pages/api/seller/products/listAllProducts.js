import dbConnect from "@/lib/mongoDb";
import SellerProduct from "@/models/SellerProduct";

const handler = async (req, res) => {
  try {
    if (req.method == "GET") {
      await dbConnect();
      const { sellerId } = req.query;
      const getAllProductsArray = await SellerProduct.find({
        Seller: sellerId,
      });
      console.log(getAllProductsArray)
      return res.status(200).send({ message: getAllProductsArray });
    } else {
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("exception occured in listing all products ", e);
    return res.status(500).send({ message:"some error occured" });
  }
};

export default handler;
