var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');

var mocha = new Mocha({
    ui: 'bdd',
    reporter: 'list'
});

mocha.addFile('./thetests.js');

mocha.run(function(failures) {

	process.on('exit', function () {

		process.exit(failures);

	});

});