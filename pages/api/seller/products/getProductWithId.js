import dbConnect from "@/lib/mongoDb";
import SellerProductModel from "@/models/SellerProduct";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
        await dbConnect();
      const { ProductId, SellerId } = req.query;
      const Product = await SellerProductModel.findOne({
        _id: ProductId,
        Seller: SellerId,
      });

      return res.status(200).send({ message: Product });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Some exception occurred" });
  }
};

export default handler;