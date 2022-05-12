
const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
let _db 

const mongoConnect = (callback)=>{
  MongoClient.connect("mongodb+srv://tabotcharlesbessong:nlXAQiqmL4D4ZApT@cluster0.azbbe.mongodb.net/node-complete?retryWrites=true&w=majority").then( client => {
  console.log('connected');
  _db = client.db()
  callback()
  }).catch(err => {
    console.log(err)
    throw err
  } )
}

const getDB = ()=>{
  if(_db){
    return _db
  }
  throw 'No database found!'
}


// module.exports = mongoConnect
// module.exports = {
//   getDB,
//   mongoConnect
// }

exports.getDB = getDB
exports.mongoConnect = mongoConnect
