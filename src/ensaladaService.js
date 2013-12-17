var async = require('async');
var modul = require('./aModule.js');

module.exports.get = function(req, res, next) {

	var salad = {};

	var questionId = req.param.questionId;
	var itemId = req.param.itemId;
	var siteId = req.param.siteId;

	async.parallel(
		// Functions to call
		{
			question: function getQuestion(callback) {
	
					modul.call("/questions/" + questionId, function(err, data) {

						if (err) callback(undefined, {error: err});
						else {

							callback(undefined, data.text);
			
						} 
			
					});

			},

			item: function getItem(callback) {

						modul.call("/items/" + itemId, function(err, data) {

							if (err) callback(undefined, {error: err});
							else {

								callback(undefined, data.title);
		
							} 
		
						});

					},

			site: function getSite(callback) {

						var backway = oneway.split("").reverse().join("");
						
						modul.call("/sites/" + siteId, function(err, data) {

							if (err) callback(undefined, {error: err});
							else {

								callback(undefined, data.name);
							
							} 
							
						});

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

			res.json(salad);
			
		}

	});

};