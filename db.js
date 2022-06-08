var mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

// var con = mysql.createPool({
//   host: "dbwisp.c5zujjjdmbwx.us-west-2.rds.amazonaws.com",
//   user: "jleopold8",
//   password: "m45t3r88",
//   port : 3306, 
//   database : "spk_saw_whey_protein" ,
//   connectionLimit : 100,
//   connectTimeout : 5000,
//   timeout : 3000,
//   multipleStatements : true,
//   waitForConnections : true,
//   acquireTimeout : 30000,
// });

var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  port : 3306, 
  database : "spk_saw_whey_protein" ,
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

exports.DB = con