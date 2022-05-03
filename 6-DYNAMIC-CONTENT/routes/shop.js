const path = require('path');

const express = require('express');
const adminRoutes = require('./admin')

const routeDir = require('../path/path.js') 
const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminRoutes.product
  res.render('shop', {prods:products,docTitle:'Shop'} )
});

module.exports = router;
