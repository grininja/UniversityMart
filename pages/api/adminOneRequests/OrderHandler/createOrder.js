import dbConnect from "@/lib/mongoDb";
import OrderReqAdminOneModel from "@/models/OrderReqAdminOne";
import AdminOneModel from "@/models/adminOne";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const {
        products,
        Institute,
        adminInitiated,
        tag,
        remarks,
        status,
        department,
      } = req.body;
      // console.log(InstituteId);
      const newOrder = new OrderReqAdminOneModel({
        products: products,
        Institute: Institute,
        adminInitiated: adminInitiated,
        tag: tag,
        remarksAdminOne: remarks,
        status: status,
        Department: department,
      });

      await newOrder.save();
      /// now time to empty cart
      await AdminOneModel.updateOne(
        {
          _id: adminInitiated,
        },
        {
          $set: {
            cart: [],
          },
        }
      );

      return res.status(200).send({ message: "Order created successfully" });
    } else {
      return res.status(404).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Some exception occurred" });
  }
};

export default handler;
