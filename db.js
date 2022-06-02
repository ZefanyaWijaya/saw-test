var mysql = require('mysql');

var con = mysql.createPool({
  host: "dbwisp.c5zujjjdmbwx.us-west-2.rds.amazonaws.com",
  user: "jleopold8",
  password: "m45t3r88",
  port : 3306, 
  database : "spk_saw_whey_protein" 

});

// con.getConnection((err, connection) => {
//   if (err) {
//       if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//           console.error('Database connection was closed.')
//       }
//       if (err.code === 'ER_CON_COUNT_ERROR') {
//           console.error('Database has too many connections.')
//       }
//       if (err.code === 'ECONNREFUSED') {
//           console.error('Database connection was refused.')
//       }
//   }
//   if (connection) connection.release()
//   return
// })

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

exports.DB = con