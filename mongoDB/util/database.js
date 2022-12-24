const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
		"mongodb+srv://charles-junior:junior2002@cluster0.pazzesj.mongodb.net/test?retryWrites=true"
	)
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
