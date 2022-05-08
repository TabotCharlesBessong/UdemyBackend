
const mysql = require('mysql2')

const pool = mysql.createPool({
  host :'localhost',
  user:'root',
  database:'mydb',
  password:'node-complete'
})

module.exports = pool.promise()