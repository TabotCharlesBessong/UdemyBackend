
const getDb = require('../util/database').getDb
const mongodb = require('mongodb')
class User {
	constructor(username, email,cart , id) {
		this.name = username;
		this.email = email;
		this.cart = cart
		this._id = id
	}

	save() {
		const db = getDb();
		db
    .collection('users')
    .insertOne(this)
    .then()
    .catch(err => {
      console.log(err)
    })
	}

	addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
			return cp.productId.toString() === product._id.toString()
		} )
		let newQuantity = 1
		
		const updatedCartItems = [...this.cart.items];
		
		if (cartProductIndex >= 0){
			newQuantity = this.cart.items[cartProductIndex].quantity + 1
			updatedCartItems[cartProductIndex].quantity = newQuantity
		}else{
			// newQuantity = 1
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity
      })
		}
		// product.quantity = 1
		// alternatively
		
    const updatedCart = {items: updatedCartItems }
		const db = getDb()
		return db
		.collection('users')
		.updateOne({_id: new mongodb.ObjectId(this._id) },{$set:{cart:updatedCart}})
	}

	getCart() {
    const db = getDb()
		const productIds = this.cart.items.map(i => {
			return i.productId
		} )
    return db
   .collection('products')
   .find({_id: {$in:productIds} })
	 .toArray()
	 .then(products => {
		 return products.map(p => {
			 return {...p,quantity:this.cart.items.find(i => {
				 return i.productId.toString() === p._id.toString()
			 } ).quantity}
		  } )
  //  .then(user => {
  //     return user.cart
  //   })
	})
  }
	static findById(userId) {
		const db = getDb();
		return db
			.collection("users")
			.find({ _id: new mongodb.ObjectId(userId) })
			.next()
			.then((user) => {
				console.log(user);
				return user;
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

module.exports = User