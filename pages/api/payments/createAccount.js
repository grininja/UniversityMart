import SellerModel from "@/models/Seller";
import dbConnect from "@/lib/mongoDb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { sellerEmail, sellerId, sellerName } = req.body;
      const { data } = await stripe.accounts.list();

      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          // if(data[i].charges_enabled===false){
          //      await stripe.accounts.del(
          //         data[i].id
          //       );
          // }
          if (data[i].email === sellerEmail) {
            return res.json({
              accountCreated: false,
              error: "Account already exists.",
            });
          }
        }
      }
      const account = await stripe.accounts.create({
        type: "standard",
        email: sellerEmail,
      });
      await SellerModel.findOneAndUpdate(
        { _id: sellerId, email: sellerEmail },
        { stripeId: account.id }
      );

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${process.env.BASE_URL}/SellerPages/Home`,
        return_url: `${process.env.BASE_URL}/SellerPages/Products`,
        type: "account_onboarding",
      });

      return res.status(200).send({
        message: "Account created successfully",
        url: accountLink.url,
      });
    } else {
      return res.status(404).send({ message: "bad request" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "some error occurred" });
  }
};

export default handler;
