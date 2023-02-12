import dbConnect from "@/lib/mongoDb";
import SellerProduct from "@/models/SellerProduct";

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      await dbConnect();
      const { name, description, category, productImageUrl, priceList,sellerId } =req.body;
      const newProduct = new SellerProduct({
        name: name,
        description: description,
        category: category,
        productImageUrl: productImageUrl,
        priceList: priceList,
        Seller:sellerId,
      });
      await newProduct.save();
      return res.status(200).send({ message: "product listed successfully" });
    } else {
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("exception occured in adding product ", e);
  }
};

export default handler;
