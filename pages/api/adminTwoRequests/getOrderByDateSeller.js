import dbConnect from "@/lib/mongoDb";
import OrderReqAdminTwo from "@/models/OrderReqAdminTwo";
import moment from "moment";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { SellerId, CustomerId, dateValue } = req.query;
      const getOrderBySellerAndDate = await OrderReqAdminTwo.find({
        Buyer: CustomerId,
        Seller: SellerId,
      });
      // console.log(getOrderBySellerAndDate)
      const result = [];
      for (var i = 0; i < getOrderBySellerAndDate.length; i++) {
        const el = getOrderBySellerAndDate[i];
        var formatted_date = moment(el.createdAt).format("YYYY-MM-DD");
        // console.log(formatted_date);
        if (formatted_date === dateValue) {
          result.push(el);
        }
      }
      return res.status(200).send({ message: result });
    } else {
      return res.status(404).send({ message: "some exception occured" });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "some exception occured" });
  }
};

  export default handler;
