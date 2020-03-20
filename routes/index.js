const express = require('express');
const request = require('request');
const convertCurrency = require('../helpers/convertor');

const router = express.Router();

/**
 * @req (object)
 * @res (object)
 * @return Currency converted object
 */
router.get('/', async function(req, res, next) {
  // Access the provided 'currency', 'from', 'to' query parameter
  const { amount, from, to } = req.query;
  const result = await convertCurrency(Number(amount), from, to);

  res.send(result).status(200);
});

module.exports = router;
