import dbConnect from "@/lib/mongoDb";
import ChatSessionModel from "@/models/ChatSession";
import InstituteModel from "@/models/Institute";
import AdminTwoModel from "@/models/adminTwo";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { SellerId } = req.query;
      const Chats = await ChatSessionModel.find({
        seller: SellerId,
        response: "",
      }).sort({ createdAt: -1 });
      const modifiedChat = [];
      for (var i = 0; i < Chats.length; i++) {
        var chat = Chats[i];
        // console.log(chat.buyer);
        const getAdminTwo = await AdminTwoModel.findById(chat.buyer);
        const getInstitute = await InstituteModel.findById(
          getAdminTwo.Institute
        );
        var newChat = {
          buyerDetail: {
            name: getInstitute.name,
            email: getInstitute.email,
            address: getAdminTwo.address,
          },
          ...chat._doc,
        };
        modifiedChat.push(newChat);
        // console.log(newChat)
      }
      return res.status(200).send({ message: modifiedChat });
    } else {
      return res.status(400).send({ message: "Bad Request" });
    }
  } catch (e) {
    return res.status(500).send({ message: "something went wrong" });
  }
};

export default handler;
