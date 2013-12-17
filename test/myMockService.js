var notfound = require('./jsons/not-found.json');
var validItem = require('./jsons/validItem.json');
var validQuestion = require('./jsons/validQuestion.json');
var validSite = require('./jsons/validSite.json');

function getItem(req, res, next) {

	var itemsPattern = new RegExp('^MLA\\d+$', 'i');

	if (!itemsPattern.test(req.params.id)) {

		notfound.message = "Item with id " + req.params.id + " not found.";
		res.json(notfound);
		
		return;

	} else if (req.query.testCase === "precio170") {

		validItem.price = 170;
		res.json(validItem);
		
		return;

	} else if (req.query.testCase === "precio-15") {

		validItem.price = -15;
		res.json(validItem);
		
		return;


	} else {
		
		notfound.message = "Item with id " + req.params.id + " not found.";
		res.json(notfound);
		
		return;

	}

}

function getQuestion(req, res, next) {

	var questionsPattern = new RegExp('^\\d+$', 'i');

	if (!questionsPattern.test(req.params.id)) {

		notfound.message = "Question with id " + req.params.id + " not found.";
		res.json(notfound);
		
		return;

	} else if (req.query.testCase === "validQuestion") {

		validQuestion.text = "Hola, se puede pagar con mercado pago?";
		res.json(validQuestion);
		
		return;

	} else if (req.query.testCase === "emptyText") {
		
		validQuestion.text = "";
		res.json(validQuestion);
		
		return;

	} else {
		
		notfound.message = "Question with id " + req.params.id + " not found.";
		res.json(notfound);
		
		return;

	}

	next();

}

function getSite(req, res, next) {

	var sitePattern = new RegExp('^[A-Za-z]+$', 'i');

	if (!sitePattern.test(req.params.id)) {

		notfound.message = "Site with id " + req.params.id + " not found.";
		res.json(notfound);
		
		return;

	} else if (req.query.testCase === "valid") {

		validSite.name = "Brasil2014";
		res.json(validSite);
		
		return;

	} else if (req.query.testCase === "validWithSpaces") {

		validSite.name = "Brasil, Brazuca is the ball";
		res.json(validSite);
		
		return;

	} else {
		
		notfound.message = "Site with id " + req.params.id + " not found.";
		res.json(notfound);
		
		return;

	}

	next();

}

function crossCases(req, res, next) {

	if (req.query.testCase === "timeout") {

		return;

	} else if (req.query.testCase === "hangup"){

		req.connection.destroy();
		return;

	} else if (req.query.testCase === "srverror") {

		next(new Error("Selferror"));

	}

	next();

}

module.exports.crossCases = crossCases;
module.exports.getItem = getItem;
module.exports.getQuestion = getQuestion;
module.exports.getSite = getSite;