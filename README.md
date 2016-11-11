# react-chessdiagram
Chess Diagram React Component

LIVE DEMO: [http://chessdiagram.juddn.com](http://chessdiagram.juddn.com)

NPM: [https://www.npmjs.com/package/react-chessdiagram](https://www.npmjs.com/package/react-chessdiagram)

![screenshot](./screenshot.PNG)

A react component that can display chess positions from FEN strings or a form of algebraic notation (P@a5 R@h8 etc)

It is almost entirely stateless. (some state is maintained to keep track of mouse / touch events.)

A callback facility is provided to report dragged pieces back to the host application.

API documentation: [./api.md](./api.md)

### sample usage

	import React, { Component } from 'react';
	import ReactDOM from 'react-dom';	
    import Chessdiagram from 'react-chessdiagram';
	
	const lightSquareColor = "#2492FF"; // light blue
	const darkSquareColor = "#005EBB"; // dark blue
	const currentPosition =  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"; // starting position
	const flip = false;
	const squareSize = 30;

	ReactDOM.render(
		<Chessdiagram flip={flip} fen={currentPosition} squareSize={squareSize} 
        	lightSquareColor={lightSquareColor} darkSquareColor={darkSquareColor} onMovePiece={onMovePiece}/>,
  		document.getElementById('root')
	);

	function onMovePiece(piece, fromSquare, toSquare) {
		let message = 'You moved ' + piece + fromSquare + " to " + toSquare + ' !';
		console.log(message);
	}

### build commands:

dev: **npm run dev** - (output to ./build/dev.chessdiagram.js and served on http://localhost:8080 by dev server)

dist: **npm run build** - (output to ./build/dist.chessdiagram.js)

lint: **npm run lint** - runs ESLint

generate API documentation: **npm run generate-docs**

testing: **npm test**

### Explanation of files and folder structure:

Folders:

Folder | Description | Comments
---------|----------|---------
 **__tests__** | contains test scrips | test.js files placed in here will be run upon invoking **npm test** 
 **.vscode** | vscode config | configuration settings for vscode editor
 **build** | compilation output | dev: **dev.chessdiagram.js** prod: **dist.chessdiagram.js**
 **demo** | source code for demo | run on invoking **npm run dev**
 **node_modules** | node modules | modules installed through **npm install**
 **src** | source code | source code for component

Files:

File | Description | Comments
---------|----------|---------
 .editorconfig | GitHub editor settings | controls how code is displayed in GitHub editor windows
 .eslintrc.js | ES Lint configutaion |
 .gitignore | git ignore list | describes files that are not tracked in git / GitHub
 api.md | Chessdiagram API reference | describes the API interface for the component
 generate-docs.js | doc generation script | auto-generates api.md from source code
 generateMarkdown.js | JSON-Markdown converter |
 LICENSE | license file |
 package.json | npm package config | npm configuration for project
 README.md | main README | This file
 screenshot.PNG | screenshot | screenshot of demo, showing the component
 webpack.config.js | webpack dist config | configures webpack for the output of **build/dist.chessdiagram.js**
 webpack.dev.config.js | webpack dev config | configures webpack for the output of **build/dev.chessdiagram.js**

### to-do: 

- add a prop for optionally hiding labels etc.
- show side to move, castling rights and other info
- show arrows etc
- handle remaining 5 FEN fields etc
- more piece types


### recently completed:
- Test suite
- deal with Scrolling properly !
- publish to npm (Yippee - it's up there !!)
- auto API-doc (api.md)
- webpack setup for distributing as component with demo.


