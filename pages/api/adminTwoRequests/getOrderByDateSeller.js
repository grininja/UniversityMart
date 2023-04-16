import dbConnect from "@/lib/mongoDb";
import OrderReqAdminTwo from "@/models/OrderReqAdminTwo";
import moment from "moment";
import SellerProductModel from "@/models/SellerProduct";
import SellerModel from "@/models/Seller";
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
        if (formatted_date === dateValue) {
          const product = await SellerProductModel.findOne({ _id: el.Product });
          const sellerDetails = await SellerModel.findOne({ _id: el.Seller });
          // console.log(sellerDetails)
          var formattedData = {
            OrderId: el._id,
            Quantity: el.Quantity,
            ExpectedDelivery: el.ExpectedDelivery,
            OrderDate: el.createdAt,
            RemarksSeller: el.RemarksSeller,
            ProductName: product.name,
            ProductDescription: product.description,
            ProductPrice: product.price,
            ImageUrl: product.productImageUrl,
            Seller: el.Seller,
            SellerDetails: {
              name: sellerDetails.name,
              email: sellerDetails.email,
              phone: sellerDetails.phone,
              address: sellerDetails.address,
            },
          };

          result.push(formattedData);
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
