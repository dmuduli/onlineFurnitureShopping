const express = require("express");

const numberRules = {
  AANT: /^\d{8,9}$/,
  NRMA: /^\d{9,10}$|^26000\d{8}$/,
  RAA: /^\d{8}$|^[a-zA-Z]{2}\d{6}$|^308416\d{8}0\d{1}$/,
  RACQ: /^\d{9}$|^26\d{11}$|^308367\d{10}$/,
  RACT: /^\d{7}$|^\d{16}$/,
  RACV: /^\d{1,8}$|^308389\d{10}$/,
  RAC: /^\d{9}$|^\d{12}$|^60333070\d{8}$/,
};

const router = express.Router();

router.post("/", (req, res) => {
  const { club, number } = req.body;
  console.log(req.body);

  if (numberRules[club].test(number)) {
    res.send({
      status: "success",
      message: "Success",
    });
  } else {
    res.status(500).send({
      status: "error",
      message: "API error",
    });
  }
});

module.exports = router;
