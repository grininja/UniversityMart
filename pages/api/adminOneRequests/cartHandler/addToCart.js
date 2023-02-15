import dbConnect from "@/lib/mongoDb";
import AdminOne from "@/models/adminOne";
import mongoose from "mongoose";
const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      await dbConnect();
      const { ItemId, departmentId, quantity, adminOneId } = req.body;
      const checkIfAlreadyInCart = await AdminOne.find({
        _id: adminOneId,
        department: departmentId,
        cart: { $elemMatch: { product: ItemId } },
      });
      if (checkIfAlreadyInCart !== null && checkIfAlreadyInCart.length > 0) {
        await AdminOne.updateOne(
          {
            _id: adminOneId,
            department: departmentId,
            "cart.product": ItemId,
          },
          {
            $set: {
              "cart.$.quantity":
                quantity + checkIfAlreadyInCart[0].cart[0].quantity,
            },
          }
        );
        return res.status(200).send({ message: "Item quantity updated" });
      }
      const updateCartOfAdmin = await AdminOne.updateOne(
        {
          _id: adminOneId,
          department: departmentId,
        },
        {
          $push: {
            cart: {
              product: mongoose.Types.ObjectId(ItemId),
              quantity: quantity,
            },
          },
        }
      );
      return res
        .status(200)
        .send({ message: "Item added successfully to cart" });
    } else {
      return res.status(400).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("exception occured while adding to cart", e);
    return res
      .status(404)
      .send({ message: "some exception occured while adding to cart" });
  }
};

export default handler;
