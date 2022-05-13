
const getDb = require('../util/database').getDb
const mongodb = require('mongodb')

class User {
  constructor(username,email){
    this.name = username
    this.email = email

  }

  save(){
    const db = getDb()
    db.collection('users').insertOne(this)
  }
  static findById(userId){
    const db = getDb()
    return db.collection('users')
    .findOne({_id: new mongodb.ObjectId(userId) })
    .next()
    // .then(user =>{
    //   console.log(user)
    //   return user
    // })
    .catch(err =>{
      console.log(err)
    } )
  }
}

module.exports = User;
