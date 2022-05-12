
const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const mongoConnect = (callback)=>{
  MongoClient.connect("mongodb+srv://tabotcharlesbessong:nlXAQiqmL4D4ZApT@cluster0.azbbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then( client => {
  console.log('connected');
  }  ).catch(err => {
    console.log(err)
  } )
  }


module.exports = mongoConnect
