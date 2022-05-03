const path = require('path');

const express = require('express');

const router = express.Router();
const routeDir = require('../path/path.js') 

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(routeDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
