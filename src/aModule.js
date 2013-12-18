var http = require('https');

var hostname = "api.mercadolibre.com";
var port = 443;

if (process.env.NODE_ENV === 'test') {

	http = require('http');
	hostname = "localhost";
	port = 7666;

}

var options = {
				hostname: hostname,
				port: port,
				secureOptions: require('constants').SSL_OP_NO_TLSv1_2,
				ciphers: 'ECDHE-RSA-AES256-SHA:AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
				honorCipherOrder: true,
				agent: false
			};

function syncAddition(a, b, callback) {

	callback(a+b);

};

function makeRequest(method, path, callback) {
	
	options.path = path;
	options.method = method;

	var req = http.request(options, function(res) {

		res.setEncoding('utf-8');

		var datos = [];

		res.on('data', function(chunk) {
			datos += chunk;
		});

		res.on('end', function() {
			
			try {
			
				return callback(undefined, JSON.parse(datos));
			
			} catch (err) {
			
				return res.emit('error', err);
			
			}
		
		});

		res.on('error', function(err) {

			return callback(err, undefined);

		});

		res.on('timeout', function() {
		
			return callback(new Error('TimeOut'), undefined);

		});


	});

	req.setTimeout(1800);

	req.on('timeout', function() {
		
		return callback(new Error('TimeOut'), undefined);

	});

	req.on('error', function(error) {

		return callback(error, undefined);

	});

	req.end();

};

module.exports.call = makeRequest;
module.exports.syncAddition = syncAddition;