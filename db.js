var mysql = require('mysql');

var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  port : 3306, 
  database : "spk_saw_whey_protein" 
  
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

exports.DB = con