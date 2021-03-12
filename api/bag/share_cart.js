const express = require("express");
const axios = require("axios");

const router = express.Router();

const {
  SEND_MAIL_URL,
  SENDGRID_API_KEY,
  SHARE_CART_TEMPLATE_ID,
  SENDGRID_CONTACT_US_FROM_EMAIL,
} = process.env;

router.post("/", async (req, res) => {
  try {
    const { checkoutUrl, cartItems, email } = req.body;
    const dynamicData = {
      returnUrl: checkoutUrl,
      cartItems,
    };
    const sendMailData = {
      from: { email: SENDGRID_CONTACT_US_FROM_EMAIL },
      personalizations: [
        { to: [{ email }], dynamic_template_data: dynamicData },
      ],
      template_id: SHARE_CART_TEMPLATE_ID,
    };
    let { data } = await axios.post(SEND_MAIL_URL, sendMailData, {
      headers: { Authorization: `Bearer ${SENDGRID_API_KEY}` },
    });
    res.send({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "Something went wrong on our side.",
    });
  }
});

module.exports = router;
