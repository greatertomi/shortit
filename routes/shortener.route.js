const { Router } = require('express');
const {
  getUrls,
  createUrls,
  getSingleUrl,
  editurl,
  deleteUrl
} = require('../controllers/shortener.controller');
const { urlValidatorRules } = require('../middleware/urlValidator');
const { validate } = require('../middleware/validate');

const router = Router();

router.get('/urls', getUrls);

router.get('/urls/:id', getSingleUrl);

router.post('/urls', urlValidatorRules, validate, createUrls);

router.put('/urls/:id', urlValidatorRules, validate, editurl);

router.delete('/urls/:id', deleteUrl);

module.exports = router;
