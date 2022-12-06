
const mongoDB = require('mongodb')

const mongoDBClient = mongoDB.MongoClient

let _db

const mongoConnect = (callback) => {
  mongoDBClient
		.connect(
			"mongodb+srv://charles-junior:junior2002@cluster0.pazzesj.mongodb.net/test"
		)
		.then((client) => {
			console.log("connected to the DB");
      _db = client.db()
      callback()
		})
		.catch((err) => {
			console.log(err);
      throw err
		});
}

const getDB = () =>{
  if (_db) {
    return _db
  }
  // throw 'NO DATABASE FOUND'
}

module.exports = mongoConnect
module.exports = getDB
