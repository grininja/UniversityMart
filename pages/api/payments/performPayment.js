import dbConnect from "@/lib/mongoDb";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const {
        productId,
        productName,
        orderId,
        priceEachProduct,
        accountId,
        customerEmail,
        productDescription = "seller product description",
        productQuantity,
      } = req.body;

      const { data } = await stripe.products.list({stripeAccount: accountId});
      var priceData = null;
      var product = null;
      var priceid = null;
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].metadata.ProductId === productId) {
            product = data[i];
            break;
          }
        }
      }
      if (product === null) {
        product = await stripe.products.create(
          {
            name: productName,
            metadata: {
              OrderId: orderId,
              ProductId: productId,
            },
            description: productDescription,
          },
          { stripeAccount: accountId }
        );
        priceData = await stripe.prices.create(
          {
            unit_amount: priceEachProduct,
            currency: "inr",
            product: product.id,
          },
          { stripeAccount: accountId }
        );
        priceid = priceData.id;
      }
      const priceList = await stripe.prices.list({stripeAccount: accountId});
      if (priceList.data.length > 0) {
        for (var i = 0; i < priceList.data.length; i++) {
          if (priceList.data[i].product === product.id) {
            priceid = priceList.data[i].id;
          }
        }
      }
      //   console.log(priceid);
        // console.log(product);
        // console.log(priceData);

        const session = await stripe.checkout.sessions.create(
          {
            customer_email: customerEmail,
            mode: "payment",
            line_items: [{ price: priceid, quantity: productQuantity }],
            success_url: `${process.env.BASE_URL}`,
            cancel_url: `${process.env.BASE_URL}`,
            metadata: { orderId },
          },
          { stripeAccount: accountId }
        );
      console.log(session);
      return res.status(200).send({ message: "transfer complete" });
    } else {
      return res.status(404).send({ message: "Bad Request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "some exception occurred" });
  }
};

export default handler;
