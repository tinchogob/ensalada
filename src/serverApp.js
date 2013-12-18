var express = require('express');

var domainErrorHandler = require('./domainErrorHandler.js');
var expressErrorHandler = require('./expressErrorHandler.js');
var ensaladaService = require('./ensaladaService.js');

var server = express();

server.use(express.urlencoded());
server.use(express.json());
server.use(domainErrorHandler);
server.use(server.router);
server.use(expressErrorHandler);

server.get("/ensalada", ensaladaService.get);
// server.get("/ensalada/:id", ensaladaService.get);

server.listen(1337);
console.log("Server listenting at port 1337");

exports = server