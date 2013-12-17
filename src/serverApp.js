var express = require('express');

var domainErrorHandler = require('./domainErrorHandler.js');
var expressErrorHandler = require('./expressErrorHandler.js');
var ensaladaService = require('./ensaladaService.js');

var server = express();

server.use(express.json());
server.use(domainErrorHandler);
server.use(server.router);
server.use(expressErrorHandler);

server.get("/ensalada", ensaladaService.get);
server.post("/ensalada/:id", ensaladaService.post);

server.listen(1337);
console.log("Server listenting at port 1337");