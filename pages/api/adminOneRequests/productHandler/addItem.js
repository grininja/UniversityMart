import dbConnect from "@/lib/mongoDb";
import Item from "@/models/Item";
import AdminOne from "@/models/AdminOne";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const {
        name,
        description,
        photoUrl,
        quantity,
        category,
        adminOneId,
        InstituteId,
      } = req.body;
      const checkAdminOne = await AdminOne.findOne({
        _id: adminOneId,
        Institute: InstituteId,
      });

      if (checkAdminOne !== null) {
        const checkIfItemExists = await Item.findOne({ name: name });
        if (checkIfItemExists !== null) {
          return res.status(404).send({ message: "Item already exists" });
        }
        const createItem = new Item({
          name: name,
          description: description,
          photo: photoUrl,
          quantity: quantity,
          category: category,
          department: checkAdminOne.department,
        });
        await createItem.save();
        return res.status(200).send({ message: "Item saved successfully" });
      } else {
        return res.status(404).send({ message: "Not authorized" });
      }
    } else {
      return res.status(404).send({ message: "Invalid request" });
    }
  } catch (e) {
    console.log("exception occurred in creating item", e);
  }
};

export default handler;
