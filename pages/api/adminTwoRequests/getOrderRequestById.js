import dbConnect from "@/lib/mongoDb";
import OrderRequestAdminOne from "@/models/OrderReqAdminOne";
import DepartmentModel from "@/models/departMent";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { OrderRequestId, InstituteId } = req.query;

      var OrderRequest = await OrderRequestAdminOne.findOne({
        _id: OrderRequestId,
        Institute: InstituteId,
      });

      const departmentId = OrderRequest.Department;
      const departmentDetail = await DepartmentModel.findOne({
        _id: departmentId,
      });
      var newOrderRequest = {
        DepartmentName: departmentDetail.name,
        ...OrderRequest._doc,
      };

      return res.status(200).send({ message: newOrderRequest });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Some exception occurred" });
  }
};

export default handler;
