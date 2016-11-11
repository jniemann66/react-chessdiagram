var fs = require('fs');
var path = require('path');
var generateMarkdown = require('./generateMarkdown.js');

var src = './src';
var reactDocs = require('react-docgen');

/* attempt to use alternative resolver (to accept multiple exported components)

// find the react-docgen resolver module:
var resolver = require(
	path.join(
		path.dirname(require.resolve('react-docgen')),
		'resolver',
		'findAllComponentDefinitions'
		)
).default;
*/

fs.readdir('./src', function (err, files) {
	if (err) {
		throw err;
	}

	/*
	// auto find all js/jsx files (no guarantee of filename order)
	var jsfiles = files.filter(function(file) {
		return path.extname(file) === '.js' || path.extname(file) === '.jsx';
	});
	*/

	// filenames in specific order:
	var jsfiles = ['chessdiagram.js', 'board.js', 'piece.js'];

	jsfiles.forEach(function (file, index) {

		// Sync version (to preserve file ordering)
		try {
			var data = fs.readFileSync(path.join('./src/',file), 'utf8');
			var componentInfo = reactDocs.parse(data /* , resolver */);
			var componentName = path.basename(file, path.extname(file));
			var componentNameCapitalized = componentName[0].toUpperCase() + componentName.slice(1);
			console.log(generateMarkdown(componentNameCapitalized, componentInfo));
		} catch (err) {
			console.log(err);
		}

		/*
		// async version
		fs.readFile(path.join('./src/',file), 'utf8', function (err,data) {
			if (err)
				return;
			var componentName = path.basename(file, path.extname(file));
			var componentNameCapitalized = componentName[0].toUpperCase() + componentName.slice(1);
			var componentInfo = reactDocs.parse(data);

			console.log(generateMarkdown(componentNameCapitalized, componentInfo));
		});
		*/

	});
});