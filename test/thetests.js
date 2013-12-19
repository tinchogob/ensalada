var should = require('should');
var ensaladaService = require('../src/ensaladaService.js');
var server = require('../src/serverApp.js');
var mockserver = require('./mock-server.js');

describe("Mock Tests", function(){

	describe("White Box testing", function() {

		describe("- Process Question -", function() {

			it("Should return same string as parameter in upper case", function() {

				var question = {text: "esta es una pregunta en minusculas"};
				var newQuestion = ensaladaService.processQuestion(question);
				newQuestion.should.be.equal(question.text.toUpperCase());

			});

			it("Should return an empty string", function() {

				var newQuestion = ensaladaService.processQuestion({text: ""});
				newQuestion.should.be.equal("");

			});
			
		});

		describe("- Process Item -", function() {

			it("Should return price * 100", function() {

				var price = 4;
				var newPrice = ensaladaService.processItem({price: price});
				newPrice.should.be.equal(price*100);


			});
			
		});

	});

	describe("Grey box testing", function() {

		describe("- Items -", function() {

			it("Should return a valid item with price=17000", function(done) {

				ensaladaService.getItem("MLA1231231?testCase=price170", function(err, data) {
					
					if (err) throw err;
					data.should.equal(17000);
					
					done();
				
				});

			});

			it("Should return a valid item with price=-1500", function(done) {

				ensaladaService.getItem("MLA1231231?testCase=price-15", function(err, data) {
					
					if (err) throw err;
					data.should.equal(-1500);
					
					done();
				
				});

			});

			it("Should return an object with error:errorMessage", function(done) {

				ensaladaService.getItem("MLA-inv-1231231?testCase=price-15", function(err, data) {
					
					if (err) throw err;
					data.should.have.property("error", "err");
					
					done();
				
				});

			});

		});

		describe("- Questions -", function() {

			it("Should return a valid Question in UPPER CASE", function(done) {

				ensaladaService.getQuestion("1231231?testCase=validQuestion", function(err, data) {
					
					if (err) throw err;
					data.should.match(/^[A-Z]/);
					
					done();
				
				});

			});

			it("Should return an empty Question", function(done) {

				ensaladaService.getQuestion("1231231?testCase=emptyText", function(err, data) {
					
					if (err) throw err;
					data.should.equal("");
					
					done();
				
				});

			});

		});

		describe("- Sites -", function() {

			it("Should return an valid Site name reversed", function(done) {

				ensaladaService.getSite("MLA?testCase=brasil2014", function(err, data) {
					
					if (err) throw err;
					data.should.equal("4102lisarb");
					
					done();
				
				});

			});

			it("Should return an valid Site name reversed with spaces", function(done) {

				ensaladaService.getSite("MLA?testCase=name+with+spaces", function(err, data) {
					
					if (err) throw err;
					data.should.equal("secaps htiw eman");
					
					done();
				
				});

			});

		});

		describe("- Cross cases -", function() {

			it("Should respond with error when the server hangs up", function(done) {

				ensaladaService.getSite("MLA?testCase=hangup", function(err, data) {
					
					if (err) throw err;
					data.should.have.property("error");
					
					done();
				
				});

			});

			it("Should respond with error when the server crashes", function(done) {

				ensaladaService.getSite("MLA?testCase=srverror", function(err, data) {
					
					if (err) throw err;
					data.should.have.property("error");
					
					done();
				
				});

			});

			it("Should respond with error when the server TO's", function(done) {

				ensaladaService.getSite("MLA?testCase=timeout", function(err, data) {
					
					if (err) throw err;
					data.should.have.property("error");
					
					done();
				
				});

			});

		});

	});

	describe("Black box testing", function() {
		
		describe("Happy test", function(done) {
		
			it("should return a JSON with 3 properties, an item price * 100, an upper cased question and a reversed site id", function(done) {

				var http = require('http');
				
				var options = {
								method: 'GET',
								host: 'localhost',
								port: 1337,
								path: '/ensalada'
							};
				
				var req = http.request(options, function(res) {

					var body = [];

					res.on('data', function(chunk) {
						body += chunk;
					})

					res.on('end', function() {
						
						body = JSON.parse(body);

						body.should.have.property("item");
						body.should.have.property("question");
						body.should.have.property("site");

						done();
					
					})

					res.on('error', function() {

						throw new Error('Error on response!');

					});

				});

				req.on('error', function(err) {

					throw new Error('Error on request!');

				});

				req.end();

			});

		});

	});

});