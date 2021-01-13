const express = require("express");
const app = express();
const mysql = require('mysql')
const _P = "<p></p>";

function debug(...args) {
  // Use a function like this one when debugging inside an AsyncHooks callback
  fs.writeFileSync('log.out', `${util.format(...args)}\n`, { flag: 'a' });
}


app.listen(3000, () => {
  console.log("Server running on port 3000");
 });
 

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'a@rhhZ46',
  database: 'db_grad_cs_1917'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


app.route("/insert")
  .get((req, res, next) =>{
    var sql = "insert into instrument values (101, '1Yr'), (102, '2yr');";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows +  " record inserted");
      res.send(result.affectedRows +  " record inserted");
      res.end();
    });
  });

app.route("/select")
  .get((req, res, next) =>{
    var sql = "select * from instrument";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      res.end();
    });
  });

app.route("/select-with-fixed-string")
  .get((req, res, next) =>{
    var sql = "select * from instrument where instrument_id=101";
    var i_id = 101;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      res.end();
    });
  });

app.route("/select-with-params")
  .get((req, res, next) =>{
    var sql = "select * from instrument where instrument_id=? ";
    var i_id = 101;
    connection.query(sql, [i_id], function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      res.end();
    });
  });

  
