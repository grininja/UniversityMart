import dbConnect from "@/lib/mongoDb";
import SellerModel from "@/models/Seller";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { SellerId, name, email, phone, address, gstin, stripeId } =
        req.body;
      await SellerModel.findOneAndUpdate(
        { _id: SellerId },
        {
          name,
          email,
          phone,
          address,
          stripeId,
          gstin,
        }
      );
      return res.status(200).send({ message: "Account updated successfully" });
    } else {
      return res.status(404).send({ message: "bad request" });
    }
  } catch (err) {}
};

export default handler;