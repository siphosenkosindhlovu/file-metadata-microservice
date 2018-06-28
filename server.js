'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require("multer")
var app = express();
var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
})


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});
app.post("/api/fileanalyse", upload.single("upfile"), function(req, res){
  var {originalname, mimetype, size} = req.file;
  res.json({originalname, mimetype, size})
})
app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
