import dbConnect from "@/lib/mongoDb";
import Item from "@/models/Item";

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      await dbConnect();
      const {
        ItemId,
        departMentId,
        name,
        description,
        photoUrl,
        quantity,
        category,
      } = req.body;
      const findItemAndUpdate = await Item.findOneAndUpdate(
        {
          _id: ItemId,
          department: departMentId,
        },
        {
          name: name,
          description: description,
          photo: photoUrl,
          quantity: quantity,
          category: category,
        }
      );
      return res.status(200).send({ message: "product updated successfully" });
    } else {
      res.status(400).send({ message: "bad request" });
    }
  } catch (e) {
    console.log("exception occured while updating item", e);
  }
};

export default handler;
