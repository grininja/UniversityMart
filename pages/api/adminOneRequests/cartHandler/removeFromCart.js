import dbConnect from "@/lib/mongoDb";
import AdminOne from "@/models/adminOne";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { ItemId, departmentId, adminOneId } = req.query;
      // console.log(ItemId,departmentId,adminOneId);
      await AdminOne.update(
        {
          _id: adminOneId,
          department: departmentId,
        },
        {
          $pull: { cart: { product: ItemId } },
        }
      );
      //   }
      return res.status(200).send({ message: "Item removed from cart" });
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
