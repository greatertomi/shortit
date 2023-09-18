const { Router } = require('express');
const { getUrls, createUrls, getSingleUrl } = require('../controllers/shortener.controller');
const { urlValidatorRules } = require('../middleware/urlValidator');
const { validate } = require('../middleware/validate');

const router = Router();

router.get('/urls', getUrls);

router.get('/urls/:id', getSingleUrl);

router.post('/urls', urlValidatorRules, validate, createUrls);

module.exports = router;
