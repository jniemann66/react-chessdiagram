import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chessdiagram from '../src/chessdiagram.js';

import './App.css';

const pieces = [
			'R@a1', 'N@b1', 'B@c1', 'Q@d1', 'K@e1', 'B@f1', 'N@g1', 'R@h1',
			'P@a2', 'P@b2', 'P@c2', 'P@d2', 'P@e2', 'P@f2', 'P@g2', 'P@h2',
			'p@a7', 'p@b7', 'p@c7', 'p@d7', 'p@e7', 'p@f7', 'p@g7', 'p@h7',
			'r@a8', 'n@b8', 'b@c8', 'q@d8', 'k@e8', 'b@f8', 'n@g8', 'r@h8',
		];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lightSquareColor: "#2492FF", // light blue
			darkSquareColor: "#005EBB", // dark blue
			currentPosition: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", // starting position
			flip: false,
			lastMessage: '',
			squareSize: 45,
			draughts: false,
			ranks: 8,
			files: 8
		};
		this.draughtsPieceDefinitions = {
			'G': (transformString) => (
				<svg>
					<image transform={transformString} href="https://upload.wikimedia.org/wikipedia/commons/9/90/Draughts_mlt45.svg" />
				</svg>
			),
			'g': (transformString) => (
				<svg>
					<image transform={transformString} href="https://upload.wikimedia.org/wikipedia/commons/0/0c/Draughts_mdt45.svg" />
				</svg>
			)
		};
		this.draughtsFen = "g1g1g1g1/1g1g1g1g/g1g1g1g1/8/8/1G1G1G1G/G1G1G1G1/1G1G1G1G w KQkq - 0 1";
		this.standardFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
	}

// event handlers:

	_onPositionChanged(evt) { // user inputted new position
		this.setState({currentPosition: evt.target.value});
	}

	_onFlipChanged(evt) { //flip board
		this.setState({flip: evt.target.checked});
	}

	_onLightSquareColorChanged(evt) {
		this.setState({lightSquareColor: evt.target.value});
	}

	_onDarkSquareColorChanged(evt) {
		this.setState({darkSquareColor: evt.target.value});
	}

	_onDraughtsChanged(evt) {
		const position = evt.target.checked ? this.draughtsFen : this.standardFen;
		this.setState({currentPosition: position,   draughts: evt.target.checked})
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

	_onFilesChanged(evt) {
		this.setState({files: Number(evt.target.value)});
	}

	_onRanksChanged(evt) {
		this.setState({ranks: Number(evt.target.value)});
	}

// the render() function:
  render() {
    return (
			<div className="demo">
				<h1>Chess Diagram</h1>
				<div>
					<p> Enter a position (using a FEN string) here:</p>
					<input type="text" value={this.state.currentPosition} size="70" onChange={this._onPositionChanged.bind(this)}
						autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck="false"/>
					<p> Square Size: </p>
					<input type="range" value={this.state.squareSize} min={10} max={100} step={1} onChange = {evt => {
						this.setState({squareSize: Number(evt.target.value)});
					}}/>
					<p>Flip Board ?<input type="checkbox" value={this.state.flip} onChange={this._onFlipChanged.bind(this)} /></p>
					<p>Draughts ?<input type="checkbox" value={this.state.draughts} onChange={this._onDraughtsChanged.bind(this)} /></p>
					<p>Light Square Color:<input type="color" value={this.state.lightSquareColor} onChange={this._onLightSquareColorChanged.bind(this)} /></p>
					<p>Dark Square Color:<input type="color" value={this.state.darkSquareColor} onChange={this._onDarkSquareColorChanged.bind(this)} /></p>
					<p>Ranks:<input type="text" value={this.state.ranks} onChange={this._onRanksChanged.bind(this)} /></p>
					<p>Files:<input type="text" value={this.state.files} onChange={this._onFilesChanged.bind(this)} /></p>
					<p/>
				</div>
					<Chessdiagram flip={this.state.flip} fen={this.state.currentPosition} squareSize={this.state.squareSize}
						lightSquareColor={this.state.lightSquareColor} darkSquareColor={this.state.darkSquareColor} onMovePiece={this._onMovePiece.bind(this)}
						ranks={this.state.ranks} files={this.state.files}
						pieceDefinitions={this.state.draughts ? this.draughtsPieceDefinitions : {}}
					/>
				<p><strong>{this.state.lastMessage}</strong></p>
			</div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
