const express = require("express");
const router = express.Router();
const redis = require("../redis");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;
  res.send({ visits });
});

module.exports = router;
