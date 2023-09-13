const { Router } = require("express");
const { getUrls, createUrls } = require("../controllers/shortener.controller");

const router = Router();

router.get("/urls", getUrls);
router.post("/urls", createUrls);

module.exports = router;
