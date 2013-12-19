var nock = require('nock');
var should = require('should');
var ensaladaService = require('../src/ensaladaService.js');
var server = require('../src/serverApp.js');

describe("Nock Tests", function() {

	it("Should get a valid item with price=170 and return 17000", function(done) {

		// nock.recorder.rec();
		var validItem = require('./jsons/validItem.json');
		validItem.price = 170;

		nock('https://api.mercadolibre.com')
		  .get('/items/MLA1231231')
		  .reply(200, validItem, { 'x-powered-by': 'Express',
		  	'content-type': 'application/json; charset=utf-8',
		  	'content-length': '1928',
		  	etag: '"635310283"',
		  	date: 'Thu, 19 Dec 2013 14:07:07 GMT',
		  	connection: 'close' });

	  	ensaladaService.getItem("MLA1231231", function(err, data) {
				
			if (err) throw err;
			data.should.equal(17000);
				
			done();
			
		});

	});

	// it("Should get a valid Question text and return its text in UPPER CASE", function(done) {

	// 	nock.recorder.rec();

	//   	ensaladaService.getQuestion("2954882427", function(err, data) {
				
	// 		if (err) throw err;
	// 		data.should.equal("text".toUpperCase());
				
	// 		done();
			
	// 	});

	// });

});

