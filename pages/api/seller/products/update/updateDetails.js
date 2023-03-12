import dbConnect from "@/lib/mongoDb";
import SellerProduct from "@/models/SellerProduct";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const {
        name,
        description,
        category,
        Price,
        productImageUrl,
        sellerId,
        productId,
        visibility,
      } = req.body;
      const updateProduct = await SellerProduct.findOneAndUpdate(
        { Seller: sellerId, _id: productId },
        {
          name: name,
          description: description,
          category: category,
          price: Price,
          productImageUrl: productImageUrl,
          visible: visibility,
        }
      );
      return res.status(200).send({ message: "Product Updated Successfully" });
    } else {
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("exception occured while updating SellerProduct", e);
  }
};

export default handler;
