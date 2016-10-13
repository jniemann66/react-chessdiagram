import React, { Component } from 'react';
import Chessdiagram from './chessdiagram.js';		

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPosition: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // starting position
			lastMessage: '',
		};
	}

// event handlers:

	_onPositionChanged(evt) { // user inputted new position
		this.setState({currentPosition: evt.target.value});
	}

	_onMovePiece(piece, fromSquare, toSquare) { // user moved a piece
		// echo move back to user:
		let message = 'You moved ' + piece + fromSquare + " to " + toSquare + ' !';
		this.setState({lastMessage: message}, (()=> {
			setTimeout(()=> {
					this.setState({lastMessage: ''}); 
			}, 2000); // clear message after 2s	
		}));
	}

// the render() function:
  render() {
    return (
			<div>
				<h1>Chess Diagram</h1>
				<div>
					<p> Enter a position (using a FEN string) here:</p>
					<input type="text" value={this.state.currentPosition} size="100" onChange={this._onPositionChanged.bind(this)} 
						autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck="false"/>
					<p/>
				</div>
								
				<Chessdiagram fen={this.state.currentPosition} squareSize={60} onMovePiece={this._onMovePiece.bind(this)}/>
				<p><strong>{this.state.lastMessage}</strong></p>
			</div>
    );
  }
}

export default App;

// <Chessdiagram pieces={pieces} squareSize={34}/>

		// "#2492FF" : "#005EBB"; // blue
		// "#ff20ff" : "#7f107f" // pink

/* 	const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
		const FEN2 = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2";

		const pieces = ['suck it','q@C4'];		
		const pieces2=[
			'R@a1',
			'N@b1',
			'B@c1',
			'Q@d1',
			'K@e1',
			'B@f1',
			'N@g1',
			'R@h1',

			'P@a2',
			'P@b2',
			'P@c2',
			'P@d2',
			'P@e2',
			'P@f2',
			'P@g2',
			'P@h2',

			'p@a7',
			'p@b7',
			'p@c7',
			'p@d7',
			'p@e7',
			'p@f7',
			'p@g7',
			'p@h7',

			'r@a8',
			'n@b8',
			'b@c8',
			'q@d8',
			'k@e8',
			'b@f8',
			'n@g8',
			'r@h8',
			
		];
*/