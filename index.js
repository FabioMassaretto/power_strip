var connect = require ('connect');
var http = require('http');
var st = require ('st');
var express = require('express');

var app = connect();
app.use(express.static(__dirname + '/public'));

http.createServer(app).listen(8000);
console.log('listening on localhost:8000');