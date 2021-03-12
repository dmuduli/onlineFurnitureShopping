const express = require("express");
const router = express.Router();
const axios = require("axios").default;

const { SNOOZE_ECOM, STORE_CATELOG_TOKEN, STORE_CATALOG_URL } = process.env;

async function apiRequest(paramsObj) {
  let result = {};
  await axios({ ...paramsObj })
    .then(function (response) {
      result = {
        status: "success",
        msg: "Api result",
        data: response.data,
      };
    })
    .catch(function (error) {
      result = {
        status: "error",
        msg: "Got some error",
        data: error,
      };
      console.log(error);
    });
  return result;
}
router.get("/", async function (req, res) {
  const paramsObj = {
    method: "get",
    url: SNOOZE_ECOM + "/ecom/all-stores",
    data: {},
  };

  // API cal to ecom store for all store data
  const storesResult = await apiRequest(paramsObj);
  if (storesResult.status == "success") {
    const pushFormatedJSON = [];

    storesResult.data.forEach((element, key) => {
      pushFormatedJSON.push({
        id: String(element.id),
        title: element.name,
        description: element.formatted_address || element.name,
        image_url: element.franchisee_image || element.name,
        last_update: Date.now(),
        blob: element,
      });
    });
    const headers = {
      Authorization: `Bearer ${STORE_CATELOG_TOKEN}`,
      "Content-Type": "application/json",
    };
    const paramsPrisObj = {
      method: "post",
      url: STORE_CATALOG_URL,
      data: pushFormatedJSON,
      headers,
    };

    // push data to prismic
    const prismicResponse = await apiRequest(paramsPrisObj);
    res.send({ ...prismicResponse });
  } else {
    res.send({ ...storesResult });
  }
});

module.exports = router;
