[![Build Status](https://travis-ci.org/jniemann66/react-chessdiagram.svg?branch=master)](https://travis-ci.org/jniemann66/react-chessdiagram)

# react-chessdiagram
Chess Diagram React Component

LIVE DEMO: [http://chessdiagram.juddn.com](http://chessdiagram.juddn.com) *updated 24-apr-2017*

Knight's Tour Demo: [http://knightstour.juddn.com](http://knightstour.juddn.com)

NPM: [https://www.npmjs.com/package/react-chessdiagram](https://www.npmjs.com/package/react-chessdiagram)

![screenshot](https://github.com/jniemann66/react-chessdiagram/blob/master/screenshot.PNG)

A react component that can display chess positions from FEN strings, PGN Strings, or a form of algebraic notation (P@a5 R@h8 etc)

It is almost entirely stateless. 
(some state is maintained to keep track of mouse / touch events, and an internal list of moves when displaying a game)

A callback facility is provided to report dragged pieces back to the host application.

API documentation: [./api.md](https://github.com/jniemann66/react-chessdiagram/blob/master/api.md)

### sample usage

	import React, { Component } from 'react';
	import ReactDOM from 'react-dom';	
    import Chessdiagram from 'react-chessdiagram';
	
	const lightSquareColor = '#2492FF'; // light blue
	const darkSquareColor = '#005EBB'; // dark blue
	const currentPosition =  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; // starting position
	const flip = false;
	const squareSize = 30;

	ReactDOM.render(
		<Chessdiagram flip={flip} fen={currentPosition} squareSize={squareSize} 
        	lightSquareColor={lightSquareColor} darkSquareColor={darkSquareColor} onMovePiece={onMovePiece}/>,
  		document.getElementById('root')
	);

	function onMovePiece(piece, fromSquare, toSquare) {
		let message = 'You moved ' + piece + fromSquare + ' to ' + toSquare + ' !';
		console.log(message);
	}

### build commands:

dev: **npm run dev** - (output to ./build/dev.chessdiagram.js and served on http://localhost:8080 by dev server)

dist: **npm run build** - (output to ./build/dist.chessdiagram.js)

lint: **npm run lint** - runs ESLint

generate API documentation: **npm run generate-docs**

testing: **npm test** (testing is implemented with Jest, Enzyme, and sinon)

### to-do: 

- add a prop for optionally hiding labels etc.
- show side to move, castling rights and other info
- show arrows etc
- handle remaining 5 FEN fields etc


### recently completed:
- **Added PGN viewer to show games** (Thanks Stephen !). *(Refer to [API Documentation](api.md) for details.)*
- Ability to define custom piece types and their corresponding FEN characters
- Test suite
- deal with Scrolling properly !
- publish to npm (Yippee - it's up there !!)
- auto API-doc (api.md)
- webpack setup for distributing as component with demo.

### Contributors:

[Judd Niemann](https://github.com/jniemann66/react-chessdiagram/commits/master?author=jniemann66) 

[Stephen Van Gordon](https://github.com/jniemann66/react-chessdiagram/commits/master?author=svangordon)


