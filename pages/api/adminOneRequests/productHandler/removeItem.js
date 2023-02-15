import dbConnect from "@/lib/mongoDb";
import Item from "@/models/Item";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { ItemId, departMentId } = req.query;
      const getItem = await Item.findOneAndDelete({
        _id: ItemId,
        department: departMentId,
      });
      return res.status(200).send({ message: "Item removed successfully" });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    console.log("exception occurred in removeitem", err);
    return res.status(404).send({ message: "something went wrong" });
  }
};

export default handler;
