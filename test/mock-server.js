var express = require('express');
var mockService = require('./myMockService');

var mocker = express();

mocker.use(express.urlencoded());
mocker.use(express.json());
mocker.use("/", mockService.crossCases);

mocker.get("/items/:id", mockService.getItem);
mocker.get("/questions/:id", mockService.getQuestion);
mocker.get("/sites/:id", mockService.getSite);

mocker.listen(7666);
console.log("Mock-server listening at port 7666");

exports = mocker;