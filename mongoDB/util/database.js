
const mongoDB = require('mongodb')

const mongoDBClient = mongoDB.MongoClient

const mongoConnect = (callback) => {
  mongoDBClient
		.connect(
			"mongodb+srv://charles-junior:junior2002@cluster0.pazzesj.mongodb.net/test"
		)
		.then((client) => {
			console.log("connected to the DB");
      callback(client)
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = mongoConnect
