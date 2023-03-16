import dbConnect from "@/lib/mongoDb";
import OrderReqAdminTwo from "@/models/OrderReqAdminTwo";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const {
        ProductId,
        Quantity,
        InstituteId,
        BuyerId,
        SellerId,
        remarksSeller = "",
        status,
      } = req.body;
      const createOrder = new OrderReqAdminTwo({
        Product: ProductId,
        Quantity: Quantity,
        Institute: InstituteId,
        Buyer: BuyerId,
        Seller: SellerId,
        RemarksSeller: remarksSeller,
        Status: status,
      });
      await createOrder.save();
      return res.status(200).send({ message: "Order Created successfully" });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Some exception occured" });
  }
};

export default handler;