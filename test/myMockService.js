var notfound = require('./jsons/not-found.json');
var validItem = require('./jsons/validItem.json');
var validQuestion = require('./jsons/validQuestion.json');
var validSite = require('./jsons/validSite.json');

function getItem(req, res, next) {

	var itemsPattern = new RegExp('^MLA\\d+$', 'i');

	if (!itemsPattern.test(req.params.id)) {

		notfound.message = "Item with id " + req.params.id + " not found.";
		return res.json(notfound);
		
	} else if (req.query.testCase == undefined) {

		return res.json(validItem);
			
	} else if (req.query.testCase === "price170") {

		validItem.price = 170;
		return res.json(validItem);
		
	} else if (req.query.testCase === "price-15") {

		validItem.price = -15;
		return res.json(validItem);
		
	} else {
		
		return res.json(validItem);
		
	}

	next();

}

function getQuestion(req, res, next) {

	var questionsPattern = new RegExp('^\\d+$', 'i');

	if (!questionsPattern.test(req.params.id)) {

		notfound.message = "Question with id " + req.params.id + " not found.";
		return res.json(notfound);
		
	} else if (req.query.testCase == undefined) {

		return res.json(validQuestion);
	
	} else if (req.query.testCase === "validQuestion") {

		validQuestion.text = "Hola, se puede pagar con mercado pago?";
		return res.json(validQuestion);

	} else if (req.query.testCase === "emptyText") {
		
		validQuestion.text = "";
		return res.json(validQuestion);

	} else {
		
		return res.json(validQuestion);
		
	}

	next();

}

function getSite(req, res, next) {

	var sitePattern = new RegExp('^[A-Za-z]+$', 'i');

	if (!sitePattern.test(req.params.id)) {

		notfound.message = "Site with id " + req.params.id + " not found.";
		return res.json(notfound);
		
	} else if (req.query.testCase == undefined) {

		return res.json(validSite);
		
	} else if (req.query.testCase === "brasil2014") {

		validSite.name = "brasil2014";
		return res.json(validSite);
		
	} else if (req.query.testCase === "name with spaces") {

		validSite.name = "name with spaces";
		return res.json(validSite);
		
	} else {
		
		return res.json(validSite);
		
	}

	next();

}

function crossCases(req, res, next) {

	if (req.query.testCase === "timeout") {

		return setTimeout(function() {

			return req.connection.destroy();
		
		}, 3*1000);

	} else if (req.query.testCase === "hangup"){

		return req.connection.destroy();

	} else if (req.query.testCase === "srverror") {

		return next(new Error("Selferror"));

	}

	next();

}

module.exports.crossCases = crossCases;
module.exports.getItem = getItem;
module.exports.getQuestion = getQuestion;
module.exports.getSite = getSite;