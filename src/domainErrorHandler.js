var domain = require('domain');

module.exports = function(req, res, next) {

	var reqd = domain.create();

	reqd.on('error', function(err) {

		console.log("Error on request domain: " + err.message);

		res.statusCode = 500;    
    	res.end(err.message + '\n');

	});

	reqd.add(req);
	reqd.add(res);

	reqd.run(next);

}