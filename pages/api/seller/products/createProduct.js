import dbConnect from "@/lib/mongoDb";
import SellerProduct from "@/models/SellerProduct";

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      await dbConnect();
      const {
        name,
        description,
        categoryvalue,
        productImageUrl,
        pricePerItem,
        sellerId,
        visible,
        serialId,
      } = req.body;
      const checkSerial = await SellerProduct.findOne({ itemSerial: serialId });
      if (checkSerial !== null) {
        return res.status(200).send({ message: "Serial is not available" });
      }
      const newProduct = new SellerProduct({
        name: name,
        description: description,
        category: categoryvalue,
        productImageUrl: productImageUrl,
        price: pricePerItem,
        Seller: sellerId,
        visible: visible,
        itemSerial: serialId,
      });
      await newProduct.save();
      return res.status(200).send({ message: "product listed successfully" });
    } else {
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("exception occured in adding product ", e);
    return res.status(500).send({ message: "some error occured" });
  }
};

export default handler;
