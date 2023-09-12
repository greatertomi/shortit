const { Router } = require('express');
const {getUrls} = require("../controllers/shortener.controller");

const router = Router();

router.get('/urls', getUrls)

module.exports = router;
