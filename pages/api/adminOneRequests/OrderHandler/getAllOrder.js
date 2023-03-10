import dbConnect from "@/lib/mongoDb";
import OrderReqAdminOneModel from "@/models/OrderReqAdminOne";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { DepartmentId } = req.query;
      const allOrders = await OrderReqAdminOneModel.find({
        Department: DepartmentId,
      });
      return res.status(200).send({ message: allOrders });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "Some error occurred" });
  }
};

export default handler;
