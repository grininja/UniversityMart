import dbConnect from "@/lib/mongoDb";
import Department from "@/models/departMent";
import InstituteModel from "@/models/Institute";
import AdminOneModel from "@/models/adminOne";
import UserModel from "@/models/User";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { departmentId, instituteId } = req.query;
      await InstituteModel.updateOne(
        { _id: instituteId },
        {
          $pullAll: {
            departments: [departmentId],
          },
        }
      );
      const findAllAdminOne = await AdminOneModel.find({
        department: departmentId,
      });
      const admin1IDS = [];
      for (let el in findAllAdminOne) {
        admin1IDS.push(findAllAdminOne[el].user);
        await UserModel.findByIdAndDelete(findAllAdminOne[el].user);
        await AdminOneModel.findByIdAndDelete(findAllAdminOne[el]._id);
      }

      await InstituteModel.updateOne(
        { _id: instituteId },
        {
          $pullAll: {
            admin1: admin1IDS,
          },
        }
      );

      const finditem = await Department.findOneAndDelete({
        _id: departmentId,
        Institute: instituteId,
      }).exec();
      res.status(200).send({ message: "Department removed successfully" });
    } else {
      return res.status(400).send({ message: "Invalid Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "some error occured" });
  }
};

export default handler;
