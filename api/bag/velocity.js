const express = require("express");
const axios = require("axios");

const router = express.Router();
const { SNOOZE_ECOM, SNOOZE_SYSTEM_API_KEY } = process.env;
const velocityURL = SNOOZE_ECOM + "/velocity/verify-membership";

const makeRequestToVelocity = data =>
  axios.post(
    velocityURL,
    {
      velocity_id: data.velocityId,
      first_name: data.firstName,
      last_name: data.lastName,
    },
    {
      headers: {
        apikey: SNOOZE_SYSTEM_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

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
