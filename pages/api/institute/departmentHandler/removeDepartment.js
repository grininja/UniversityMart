import dbConnect from "@/lib/mongoDb";
import Department from "@/models/departMent";
import InstituteModel from "@/models/Institute";

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

      const finditem = await Department.findOneAndDelete({
        _id: departmentId,
        Institute: instituteId,
      }).exec();
      res.status(200).send({ message: "admin removed successfully" });
    } else {
      return res.status(400).send({ message: "Invalid Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "some error occured" });
  }
};

export default handler;
