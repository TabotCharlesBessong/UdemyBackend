
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