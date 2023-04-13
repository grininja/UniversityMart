import dbConnect from "@/lib/mongoDb";
import SellerModel from "@/models/Seller";
import checkForRoles from "@/helper/checkSingleRole";
const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { EmailId, Phone, Gstin, Address, Name } = req.body;
      // console.log(req.body);
      const checkEmail = await SellerModel.findOne({ email: EmailId });
      if (checkEmail !== null) {
        return res.status(200).send({ message: "Seller already exists" });
      }
      const checkPhone = await SellerModel.findOne({ phone: Phone });
      if (checkPhone !== null) {
        return res.status(200).send({ message: "Seller already exists" });
      }
      const checkGstin = await SellerModel.findOne({ gstin: Gstin });
      if (checkGstin !== null) {
        return res.status(200).send({ message: "Seller already exists" });
      }
      if (checkEmail !== null) {
        const checkRoles = await checkForRoles(checkEmail._id, EmailId);
        if (checkRoles === false) {
          return res
            .status(200)
            .send({ message: "Already some roles assigned" });
        }
      }
      const newSeller = new SellerModel({
        name: Name,
        email: EmailId,
        phone: Phone,
        gstin: Gstin,
        address: Address,
      });
      await newSeller.save();
      return res.status(200).send({ message: "Seller created successfully" });
    } else {
      return res.status(400).send({ message: "Invalid response code" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "some exception occured" });
  }
};

export default handler;
