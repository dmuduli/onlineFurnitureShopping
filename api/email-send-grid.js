const express = require("express");
const fetch = require("node-fetch");

const rouer = express.Router();
const {
  SENDGRID_API_KEY,
  SENDGRID_CONTACT_US_FROM_EMAIL,
  CONTACT_US_EMAIL_TO,
  CONTACT_US_TEMPLATE_ID,
  CONTACT_US_AUTO_SEND_TEMPLATE_ID,
  SEND_MAIL_URL,
  SENDGRID_FEEDBACK_FROM_EMAIL,
  FEEDBACK_EMAIL_TO,
  FEEDBACK_TEMPLATE_ID,
  FEEDBACK_AUTO_SEND_TEMPLATE_ID,
} = process.env;

rouer.post("/", function (req, res) {
  const {
    enquiry,
    firstName,
    lastName,
    message,
    email,
    name,
    formName,
  } = req.body;

  function sendMail(url, data, apiKey) {
    let bodyData = {};
    try {
      bodyData = JSON.stringify(data);
    } catch (err) {
      console.log("JSON error", err);
    }
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `BEARER ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: bodyData,
    })
      .then(response => {
        response.json();
        res.send({ status: "success", msg: "Mail send successfully" });
      })
      .catch(error => {
        console.error("Error", error);
        res.send({ status: "error", msg: error.message });
      });
  }
  const fromData = {
    email:
      formName == "feedback"
        ? SENDGRID_FEEDBACK_FROM_EMAIL
        : SENDGRID_CONTACT_US_FROM_EMAIL,
  };

  const dynamicData = {
    firstName,
    lastName,
    enquiry,
    email,
    message,
    name,
    feedback: message,
  };

  const sendMailData = {
    // contact us mail send data
    from: fromData,
    personalizations: [
      {
        to: [
          {
            email:
              formName == "feedback" ? FEEDBACK_EMAIL_TO : CONTACT_US_EMAIL_TO,
          },
        ],
        dynamic_template_data: dynamicData,
      },
    ],
    template_id:
      formName == "feedback" ? FEEDBACK_TEMPLATE_ID : CONTACT_US_TEMPLATE_ID,
  };

  // send mail
  sendMail(SEND_MAIL_URL, sendMailData, SENDGRID_API_KEY);

  const autoSendData = {
    from: fromData,
    personalizations: [
      {
        to: [
          {
            email,
          },
        ],
        dynamic_template_data: dynamicData,
      },
    ],
    template_id:
      formName == "feedback"
        ? FEEDBACK_AUTO_SEND_TEMPLATE_ID
        : CONTACT_US_AUTO_SEND_TEMPLATE_ID,
  };

  // send mail Auto
  sendMail(SEND_MAIL_URL, autoSendData, SENDGRID_API_KEY);
});

module.exports = rouer;
