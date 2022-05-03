const path = require('path');

const express = require('express');

const routeDir = require('../path/path.js') 
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(routeDir, 'views', 'shop.html'));
});

module.exports = router;
