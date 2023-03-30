import AdminOneModel from "@/models/adminOne";
import AdminTwoModel from "@/models/adminTwo";
import UserModel from "@/models/User";
import dbConnect from "@/lib/mongoDb";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { InstituteId } = req.query;
      const allAdminOne = await AdminOneModel.find({ Institute: InstituteId });
      const allAdminTwo = await AdminTwoModel.find({ Institute: InstituteId });
      const adminOneDetails = [];
      const adminTwoDetails = [];
      // const adminThreeDetails = [];
      for (let el in allAdminOne) {
        // console.log(el);
        const adminOneItem = allAdminOne[el];
        const userDetail = await UserModel.findById(adminOneItem.user);
        adminOneDetails.push({
          id: userDetail._id,
          email: userDetail.email,
          name: userDetail.name,
          phone: userDetail.phone,
          role: "admin1",
        });
      }
      for (let el in allAdminTwo) {
        const adminTwoItem = allAdminTwo[el];
        const userDetail = await UserModel.findById(adminTwoItem.user);
        adminTwoDetails.push({
          id: userDetail._id,
          email: userDetail.email,
          name: userDetail.name,
          phone: userDetail.phone,
          role: "admin2",
        });
      }

      return res.status(200).send({
        adminOneDetails: adminOneDetails,
        adminTwoDetails: adminTwoDetails,
      });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "something went wrong" });
  }
};

export default handler;
