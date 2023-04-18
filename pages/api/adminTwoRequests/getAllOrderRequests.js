import dbConnect from "@/lib/mongoDb";
import OrderRequestAdminOne from "@/models/OrderReqAdminOne";
import DepartmentModel from "@/models/departMent";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { InstituteID, AdminTwoId } = req.query;

      var OrderRequests = await OrderRequestAdminOne.find({
        Institute: InstituteID,
      });
      // console.log(OrderRequests);
      var result = [];
      for (var i = 0; i < OrderRequests.length; i++) {
        const departmentId = OrderRequests[i].Department;
        const departmentDetail = await DepartmentModel.findOne({
          _id: departmentId,
        });
        var newOrderRequest = {
          DepartmentName: departmentDetail.name,
          ...OrderRequests[i]._doc,
        };
        result.push(newOrderRequest);
      }
      // console.log(result);
      return res.status(200).send({ message: result });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Some exception occurred" });
  }
};

export default handler;
