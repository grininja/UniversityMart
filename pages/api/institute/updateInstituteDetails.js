import dbConnect from "@/lib/mongoDb";
import Institute from "@/models/Institute";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { InstituteId, Name, Address, Phone } = req.body;
      await Institute.findOneAndUpdate(
        { _id: InstituteId },
        {
          name: Name,
          address: Address,
          phone: Phone,
        }
      );
      return res.status(200).send({ message: "Details Updated" });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log("exception occcured while getting all instutes", e);
    return res.status(404).send({ message: "Some exception occured" });
  }
};

export default handler;
