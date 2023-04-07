const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { accountID } = req.query;
      const account = await stripe.accounts.retrieve(accountID);
      if (
        account.charges_enabled === true &&
        account.details_submitted === true
      ) {
        return res.status(200).send({ message: true });
      } else {
        return res.status(200).send({ message: false });
      }
    } else {
      return res.status(404).send({ message: "Bad request" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "some exception occured" });
  }
};

export default handler;
