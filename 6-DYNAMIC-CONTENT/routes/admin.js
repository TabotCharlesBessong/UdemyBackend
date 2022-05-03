const path = require('path');

const express = require('express');

const router = express.Router();
const routeDir = require('../path/path.js'); 
const { title } = require('process');

const product = []

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product',{docTitle:'Add product'})
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  // console.log(req.body);
  product.push({title:req.body.title,desc:req.body.desc,img:req.body.img,price:req.body.price})
  res.redirect('/');
});


module.exports = {
  router,
  product
}

