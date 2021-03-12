const express = require("express");
const axios = require("axios");

const router = express.Router();
const { SNOOZE_ECOM, SNOOZE_SYSTEM_API_KEY } = process.env;
const velocityURL = SNOOZE_ECOM + "/velocity/calculate-points";

const makeRequestToVelocity = data =>
  axios.post(velocityURL, data, {
    headers: {
      apikey: SNOOZE_SYSTEM_API_KEY,
      "Content-Type": "application/json",
    },
  });

router.post("/", async (req, res) => {
  try {
    const { data } = await makeRequestToVelocity(req.body);

    res.send({
      status: "success",
      message: "Success",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "error",
      message: "API error",
    });
  }
});

module.exports = router;
