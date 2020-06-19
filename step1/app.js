'use strict';

var express = require('express');
var app = express();
var server = app.listen(3000);
console.log('run');

// app.use(express.static(__dirname));
// app.use(express.static(__dirname + '/../game0'));
app.use(express.static(__dirname));
// console.log(__dirname + '/../game0');
console.log('con');

