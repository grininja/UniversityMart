import dbConnect from "@/lib/mongoDb";
import AdminOne from "@/models/adminOne";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { ItemId, departmentId, adminOneId } = req.body;
      const checkIfAlreadyInCart = await AdminOne.find({
        _id: adminOneId,
        department: departmentId,
        cart: { $elemMatch: { product: ItemId } },
      });
      if (checkIfAlreadyInCart !== null && checkIfAlreadyInCart.length > 0) {
        if (checkIfAlreadyInCart[0].cart[0].quantity === 1) {
          return res.status(200).send({ message: "Can not reduce quantity" });
        }
        await AdminOne.updateOne(
          {
            _id: adminOneId,
            department: departmentId,
            "cart.product": ItemId,
          },
          {
            $set: {
              "cart.$.quantity": Math.max(
                1,
                checkIfAlreadyInCart[0].cart[0].quantity - 1
              ),
            },
          }
        );
      }
      return res.status(200).send({ message: "Item quantity updated" });
    } else {
      return res.status(400).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("some exception occured while reducing quantiyt", e);
    return res
      .status(404)
      .send({ message: "some exception occured while reducing quantity" });
  }
};

export default handler;
