var should = require('should');
var modul = require('./aModule.js');

describe("Testing test testing", function() {

	describe("Synchronous testing", function() {

		it("Test 1", function() {

			modul.syncAddition(2, 3, function(num) {

				num.should.equal(5);

			});

		});

		
	}); 

	describe("Asynchronous testing", function() {

		it("Test 1", function(done) {

			modul.call("/sites/MLA", function(err, data) {
				
				if (err) throw err;
				data.should.have.property("name", "Argentina");
				data.should.have.property("mercadopago_version");
				data.should.not.have.property("prop");

				done();
			
			});

		});
	
		it("Test 1", function(done) {

			modul.call("https://api.mercadolibre.com/items/MLA481867744", function(err, data) {
				
				if (err) throw err;
				
				data.should.have.property("price", 170);

				done();
			});

		});
		
	});

});