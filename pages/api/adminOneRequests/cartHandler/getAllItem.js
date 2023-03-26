import dbConnect from "@/lib/mongoDb";
import AdminOne from "@/models/adminOne";
import ItemModel from "@/models/Item";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { AdminOneId } = req.query;
      const getCartItems = await AdminOne.findById({ _id: AdminOneId });
      let cartItems = [];
      if (getCartItems !== null) {
        cartItems = getCartItems.cart;
      }
      let cartItemWithd = [];
      for (let i = 0; i < cartItems.length; i++) {
        let product = cartItems[i].product;
        let description = await ItemModel.findById({ _id: product });
        cartItemWithd.push({
          detail: description,
          quantity: cartItems[i].quantity,
        });
      }
      return res.status(200).send({ message: cartItemWithd });
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log("exception occured in getting cart items", e);
    return res.status(404).send({ message: "error getting cart items" });
  }
};

export default handler;
