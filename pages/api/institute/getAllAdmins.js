import dbConnect from "@/lib/mongoDb";
import InstituteSchema from "@/models/Institute";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
        const {name}=req.query;
    } else {
        return res.status(400).send({message:"Invalid request"});
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "some exception occured" });
  }
};

export default handler;
