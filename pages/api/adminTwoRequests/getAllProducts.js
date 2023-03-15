import dbConnect from "@/lib/mongoDb";
import SellerProductModel from "@/models/SellerProduct";
import AdminTwoModel from "@/models/adminTwo";
import SellerModel from "@/models/Seller";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { AdminTwoId, InstituteId } = req.query;
      const checkAdminTwo = await AdminTwoModel.findOne({
        _id: AdminTwoId,
        Institute: InstituteId,
      });
      if (checkAdminTwo === null) {
        return res.status(401).send({ message: "Unauthorized access" });
      }
      const allProducts = await SellerProductModel.find();
      const filteredProducts = [];
      for (var i = 0; i < allProducts.length; i++) {
        var el = allProducts[i];
        if (el.visible === true) {
          const findSeller = await SellerModel.findById(el.Seller);
          var newProductDetail = {
            sellerDetail: findSeller,
            ...el._doc,
          };
          filteredProducts.push(newProductDetail);
        }
      }
      return res.status(200).send({ message: filteredProducts });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Some exception occured" });
  }
};

export default handler;
