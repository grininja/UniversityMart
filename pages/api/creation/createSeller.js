import dbConnect from "@/lib/mongoDb";
import Seller from "@/models/Seller";

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      await dbConnect();
      const { name, email, password, phone, address, gstin } = req.body;
      const checkIfSellerExistsWithEmail = await Seller.find({
        email: email,
      });
      const checkIfSellerExistsWithPhone = await Seller.find({
        phone: phone,
      });
      const checkIfSellerExistsWithGstin = await Seller.find({
        gstin: gstin,
      });

      if (
        checkIfSellerExistsWithEmail.length > 0 ||
        checkIfSellerExistsWithGstin.length > 0 ||
        checkIfSellerExistsWithPhone.length > 0
      ) {
        return res.status(400).send({ message: "Seller already exists" });
      }
      const createSeller = new Seller({
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
        gstin: gstin,
      });
      await createSeller.save();
      res.status(200).send({ message: "Seller created successfully" });
    } else {
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("exception occurred while creating seller: " + e);
    return res.status(500).send({ message:"some error occured" });
  }
};

export default handler;
