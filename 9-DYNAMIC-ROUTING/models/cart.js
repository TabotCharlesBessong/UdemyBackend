
const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id , productPrice){
    // fetch all cart
    fs.readFile(p , (err,fileContent)=>{
      let cart = {prodcuts:[],totalPrice:0}
      if(!err){
        cart = JSON.parse(fileContent)
      }
    // analyse all product
      const existingProductIndex = cart.prodcuts.findIndex(prod => prod.id === id )
      const existingProduct = cart.prodcuts[existingProductIndex]
      let updatedProduct
    // add new product increase qty
      if(existingProduct){
        updatedProduct = {...existingProduct}
        updatedProduct.qty = updatedProduct.qty + 1
        cart.prodcuts = [...cart.prodcuts]
        cart.prodcuts[existingProductIndex] = updatedProduct
      }else{
        updatedProduct = {id:id , qty : 1}
        cart.prodcuts = [...cart.prodcuts, updatedProduct]
      }
      cart.totalPrice =  cart.totalPrice + +productPrice
      // cart.totalPrice =  parseFloat(cart.totalPrice).toFixed(2)
      fs.writeFile(p, JSON.stringify(cart), err =>{
        console.log(err);
      } )
    })
  }

}