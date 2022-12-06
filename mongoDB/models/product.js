
const getDB = require('../util/database').getDB
class Product {
  constructor(title,price,description,imageUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  
  // saving to mongo db database
  save() {
    const db = getDB()
    db.collection('products').insertOne(this).then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
  }
}

module.exports = Product