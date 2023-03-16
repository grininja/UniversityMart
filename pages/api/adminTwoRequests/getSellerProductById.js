import dbConnect from "@/lib/mongoDb";
import SellerProductModel from "@/models/SellerProduct";
import AdminTwoModel from "@/models/adminTwo";
import SellerModel from "@/models/Seller";
const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const { AdminTwoId, ProductId } = req.query;
      const checkAdminTwo = await AdminTwoModel.findOne({
        _id: AdminTwoId,
      });
      if (checkAdminTwo === null) {
        return res.status(401).send({ message: "Unauthorized access" });
      }
      var filteredProduct;
      const allProducts = await SellerProductModel.findById(ProductId);
      var el = allProducts;
      if (el.visible === true) {
        const findSeller = await SellerModel.findById(el.Seller);
        var newProductDetail = {
          sellerDetail: findSeller,
          ...el._doc,
        };
        filteredProduct = newProductDetail;
      }

      return res.status(200).send({ message: filteredProduct });
    } else {
      return res.status(400).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Some exception occured" });
  }
};

export default handler;
