var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');

var mocha = new Mocha({
    ui: 'bdd',
    reporter: 'list'
    // reporter: 'nyan'
});

mocha.addFile('./test/thetests.js');
// mocha.addFile('./test/nocktests.js');

mocha.run(function(failures) {

	process.on('exit', function () {

		process.exit(failures);

	});

});