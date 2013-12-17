module.exports = function(err, req, res, next) {

	if (err == undefined) next(); 
	else {

		console.log("Error being handled..");
		res.statusCode = 500;
    	res.end(err.message + '\n');
	}

}