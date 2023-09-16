const { Router } = require("express");
const shortenerRoute = require("./shortener.route");

const router = Router();

router.use("/", shortenerRoute);

module.exports = router;
