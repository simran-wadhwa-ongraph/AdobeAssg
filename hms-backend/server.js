var express = require('express');
var app = express();
var fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/getHospitalList', function (req, res) {
  // console.log("backend dsfsfsfsfsfsdfsdfs")
  fs.readFile( __dirname + "/" + "hospital.json", 'utf8', function (err, data) {
     console.log( data );
     res.end( data );
  });
})

  app.post('/addHospitalData', function (req, res) {
    // First read existing hospitalData.
    fs.readFile( __dirname + "/" + "hospital.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data[req.body.objectKey] = req.body.objectData;
       fs.writeFile('hospital.json',JSON.stringify(data),function(err){
        if(err) throw err;
        res.end( JSON.stringify(data));
      })
    });
  })

  app.delete('/deleteHospitalData/:id', function (req, res) {
    console.log("data--------------",req.params)
    // First read existing data.
    fs.readFile( __dirname + "/" + "hospital.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       console.log( data );
       delete data[req.params.id];
       fs.writeFile('hospital.json',JSON.stringify(data),function(err){
        if(err) throw err;
        res.end( JSON.stringify(data));
      })
    });
 })

 app.get('/getDepartmentData', function (req, res) {
  // console.log("backend dsfsfsfsfsfsdfsdfs")
  fs.readFile( __dirname + "/" + "department.json", 'utf8', function (err, data) {
     console.log( data );
     res.end( data );
  });
})

  app.post('/addDepartmentData', function (req, res) {
    // First read existing hospitalData.
    fs.readFile( __dirname + "/" + "department.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data[req.body.objectKey] = req.body.objectData;
       console.log("data---",data)
       fs.writeFile('department.json',JSON.stringify(data),function(err){
        if(err) throw err;
        res.end( JSON.stringify(data));
      })
    });
  })

  app.delete('/deleteDepartmentData/:id', function (req, res) {
    console.log("data--------------",req.params)
    // First read existing data.
    fs.readFile( __dirname + "/" + "department.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       console.log( data );
       delete data[req.params.id];
       fs.writeFile('department.json',JSON.stringify(data),function(err){
        if(err) throw err;
        res.end( JSON.stringify(data));
      })
    });
 })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});