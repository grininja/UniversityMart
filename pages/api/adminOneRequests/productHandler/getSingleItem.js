import dbConnect from "@/lib/mongoDb";
import AdminOneModel from "@/models/adminOne";
import ItemModel from "@/models/Item";
import mongoose from "mongoose";
const handler = async (req, res) => {
  try {
    if (req.method == "GET") {
        await dbConnect();
      const { ItemId} = req.query;
      const Item = await ItemModel.findById(ItemId);
    //   console.log(Item);
      return res.status(200).send({ message: Item });
    } else {
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "some error" });
  }
};

export default handler;
