var should = require('should');
var ensaladaService = require('../src/ensaladaService.js');

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

});
