

function getItem(req, res, next) {

	res.json({test: "test"});	

}

function getQuestion(req, res, next) {

	res.json({test: "test"});

}

function getSite(req, res, next) {

	res.json({test: "test"});

}

module.exports.getItem = getItem;
module.exports.getQuestion = getQuestion;
module.exports.getSite = getSite;