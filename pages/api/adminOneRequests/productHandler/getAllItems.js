import dbConnect from "@/lib/mongoDb";
import Item from "@/models/Item";

const handler = async (req, res) => {
  try {
    if (req.method == "GET") {
      await dbConnect();
      const { departmentId } = req.query;
      const itemsList = await Item.find({ department: departmentId });
      return res.status(200).send({ items: itemsList });
    } else {
      return res.status(400).send({ message: "invalid request" });
    }
  } catch (e) {
    console.log("exception occured while fetching items", e);
    return res.status(404).send({ message: "Error fetching items" });
  }
};

export default handler;
