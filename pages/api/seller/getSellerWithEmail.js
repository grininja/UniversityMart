import dbConnect from "@/lib/mongoDb";
import apiCall from "@/helper/apiCall";
import SellerModel from "@/models/Seller";
import { useDebugValue } from "react";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { EmailId } = req.query;
      const SellerCheck = await SellerModel.findOne({
        email: EmailId,
      });
      if (SellerCheck !== null) {
        return res.status(200).send({ message: SellerCheck });
      }

      return res.status(200).send({ message: SellerCheck });
    } else {
      return res.status(400).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "Some error occurred" });
  }
};

export default handler;
