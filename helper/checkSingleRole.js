import dbConnect from "@/lib/mongoDb";
import AdminOneModel from "@/models/adminOne";
import AdminTwoModel from "@/models/adminTwo";
import SellerModel from "@/models/Seller";
const checkForRoles = async (userId, emailId) => {
  await dbConnect();
  const checkRole1 = await AdminOneModel.findOne({ user: userId });
  const checkRole2 = await AdminTwoModel.findOne({ user: userId });
  const checkRole3 = await SellerModel.findOne({ email: emailId });
  const val1 = checkRole1 == null ? 0 : 1;
  const val2 = checkRole2 == null ? 0 : 1;
  const val3 = checkRole3 == null ? 0 : 1;
  console.log(val1, val2, val3);
  if (val1 + val2 + val3 > 0) {
    return false;
  }
  return true;
};

export default checkForRoles;
