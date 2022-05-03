const path = require('path');

const express = require('express');
const adminRoutes = require('./admin')

const routeDir = require('../path/path.js') 
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('shop.js',adminRoutes.product);
  res.sendFile(path.join(routeDir, 'views', 'shop.html'));
});

module.exports = router;
