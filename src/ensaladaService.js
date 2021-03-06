var async = require('async');
var modul = require('./aModule.js');

module.exports.get = function(req, res, next) {

	var salad = {};

	var questionId = "123535435";
	var itemId = "MLA123123123";
	var siteId = "MLB";

	async.parallel(
		// Functions to call
		{
			question: function(callback) {
					
				getQuestion(questionId, callback);

			},

			item: function(callback) {

				getItem(itemId, callback);

			},

			site: function(callback) {

				getSite(siteId, callback);
				
			}

		}, 

		// Main Callback
		function(err, results) {

			if (err) {

				var e = new Error("Parallel error: " + err.message);
				next(e);

			} else { 

				if (results.item.error === undefined) {

					salad.item = results.item;

				} 

				if (results.question.error === undefined) {
				
					salad.question = results.question;
				
				} 

				if (results.site.error === undefined) {
				
					salad.site = results.site;

				} 

				return res.json(salad);
			
			}

	});

};

function processItem(item) {
	
	return item.price * 100;

}

function processQuestion(question) {
	
	return question.text.toUpperCase();

}

function processSite(site) {
	
	return site.name.split("").reverse().join("");

}

function getItem(id, callback) {

	modul.call("GET", "/items/" + id, function(err, data) {

		if (err || data.status >= 400) callback(undefined, {error: "err"});
		else {

			var price = processItem(data);
			callback(undefined, price);

		} 

	});

}

function getQuestion(id, callback) {

	modul.call("GET", "/questions/" + id, function(err, data) {

		if (err || data.status >= 400) callback(undefined, {error: "err"});
		else {

			var text = processQuestion(data);
			callback(undefined, text);

		} 

	});

}

function getSite(id, callback) {

	modul.call("GET", "/sites/" + id, function(err, data) {

		if (err || data.status >= 400) callback(undefined, {error: "err"});
		else {

			var name = processSite(data);
			callback(undefined, name);
		
		} 
		
	});

}

module.exports.getItem = getItem;
module.exports.processItem = processItem;

module.exports.getSite = getSite;
module.exports.processSite = processSite;

module.exports.getQuestion = getQuestion;
module.exports.processQuestion = processQuestion;