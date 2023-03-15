import dbConnect from "@/lib/mongoDb";
import OrderRequestAdminOne from "@/models/OrderReqAdminOne";
import DepartmentModel from "@/models/departMent";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
        await dbConnect();
      const { OrderReuqestId, InstituteId, newStatus, adminTwoRemark } =
        req.body;
      const updateRes = await OrderRequestAdminOne.findOneAndUpdate(
        { _id: OrderReuqestId, Institute: InstituteId },
        {
          status: newStatus,
          remarksAdminTwo: adminTwoRemark,
        }
      );

      return res.status(200).send({ message: "Request updated" });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).send({ message: "some exception occured" });
  }
};

export default handler;
