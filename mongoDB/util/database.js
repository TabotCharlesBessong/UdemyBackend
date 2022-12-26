const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dotenv = require('dotenv')

let _db;
dotenv.config()

const mongoConnect = callback => {
  MongoClient.connect(process.env.MONGO_URL)
		.then((client) => {
			console.log("Connected!");
			_db = client.db();
			callback();
		})
		.catch((err) => {
			console.log(err,'mongo db error');
			throw err;
		});
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
