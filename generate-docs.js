var fs = require('fs');
var path = require('path');


var src = './src';
var reactDocs = require('react-docgen');
//var componentInfo = reactDocs.parse(src);

fs.readdir('./src', function (err, files) {
	if (err) {
		throw err;
	}

	var jsfiles = files.filter(function(file) {
		return path.extname(file) === '.js' || path.extname(file) === '.jsx';
	});

	jsfiles.forEach(function (file, index) {
		fs.readFile(path.join('./src/',file), 'utf8', function (err,data) {
			if (err)
				return;
			var componentInfo = reactDocs.parse(data);
			console.log(componentInfo);
		});
	});
});
