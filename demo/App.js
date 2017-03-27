import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chessdiagram from '../src/chessdiagram.js';
import Chess from 'chess.js';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lightSquareColor: "#2492FF", // light blue
			darkSquareColor: "#005EBB", // dark blue
			flip: false,
			lastMessage: '',
			squareSize: 45,
			gameType: 'chess'
		};
		this.gamePresets = {
			chess: {
				// fen: "1r3kr1/pbpBBp1p/1b3P2/8/8/2P2q2/P4PPP/3R2K1 b - - 0 24",
				files: 8,
				gameHistory: true,
				ranks: 8,
				pieceDefinitions: {},
				pgn: ['[Event "Casual Game"]',
	       '[Site "Berlin GER"]',
	       '[Date "1852.??.??"]',
	       '[EventDate "?"]',
	       '[Round "?"]',
	       '[Result "1-0"]',
	       '[White "Adolf Anderssen"]',
	       '[Black "Jean Dufresne"]',
	       '[ECO "C52"]',
	       '[WhiteElo "?"]',
	       '[BlackElo "?"]',
	       '[PlyCount "47"]',
	       '',
	       '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
	       'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
	       'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
	       'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
	       '23.Bd7+ Kf8 24.Bxe7# 1-0'].join('\n')
			},
			draughts: {
				fen: "1g1g1g1g1g/g1g1g1g1g1/1g1g1g1g1g/g1g1g1g1g1/10/10/1G1G1G1G1G/G1G1G1G1G1/1G1G1G1G1G/G1G1G1G1G1 w - - 0 1",
				files: 10,
				gameHistory: false,
				ranks: 10,
				pieceDefinitions: {
					'G': this._createPieceDefinition("https://upload.wikimedia.org/wikipedia/commons/9/90/Draughts_mlt45.svg"),
					'g': this._createPieceDefinition("https://upload.wikimedia.org/wikipedia/commons/0/0c/Draughts_mdt45.svg")
				},
				pgn: ''
			},
			courier: {
				fen: "rnbcmk1scbnr/1ppppp1pppp1/6q5/p5p4p/P5P4p/6Q5/1PPPPP1PPPP1/RNBCMK1SCBNR",
				files: 12,
				gameHistory: false,
				ranks: 8,
				pieceDefinitions: {
					'C': this._createPieceDefinition("https://upload.wikimedia.org/wikipedia/commons/7/7c/Chess_Blt45.svg"),
					'c': this._createPieceDefinition("https://upload.wikimedia.org/wikipedia/commons/5/5a/Chess_Bdt45.svg"),
					'M': this._createPieceDefinition("https://upload.wikimedia.org/wikipedia/commons/1/17/Chess_flt45.svg"),
					'm': this._createPieceDefinition("https://upload.wikimedia.org/wikipedia/commons/2/2c/Chess_fdt45.svg"),
					'S': this._createPieceDefinition("https://upload.wikimedia.org/wikipedia/commons/c/ce/Chess_tlt45.svg"),
					's': this._createPieceDefinition("https://upload.wikimedia.org/wikipedia/commons/e/e2/Chess_tdt45.svg")
				},
				pgn: ''
			}
		};
		this.state = Object.assign({}, this.state, this.gamePresets[this.state.gameType])
	}

	// Convenience function for concisely creating piece definition callbacks
	_createPieceDefinition(url) {
		return (transformString) => (
			<svg>
				<image transform={transformString} href={url} />
			</svg>
		)
	}

// event handlers:

	_onFenChanged(evt) { // user inputted new position
		this.setState({fen: evt.target.value});
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

	_onMovePiece(piece, fromSquare, toSquare) { // user moved a piece
		clearTimeout(this.timeout);
		// echo move back to user:
		let message = 'You moved ' + piece + fromSquare + " to " + toSquare + ' !';
		this.setState({lastMessage: message}, () => {
			this.timeout = setTimeout(() => {this.setState({lastMessage: ''})}, 2000)
		});
	}

	_onFilesChanged(evt) {
		this.setState({files: Number(evt.target.value)});
	}

	_onRanksChanged(evt) {
		this.setState({ranks: Number(evt.target.value)});
	}

	_onGameTypeChange(evt) {
		this.setState(Object.assign(this.gamePresets[evt.target.value], {gameType: evt.target.value}));
	}

	_onPgnChanged(evt) {
		this.setState({pgn: evt.target.value});
		this.game.load_pgn(evt.target.value);
	}

// the render() function:
  render() {
    return (
			<div className="demo">
				<h1>Chess Diagram</h1>
				<div>
					<div>
						<p> Enter a position (using a FEN string) here:</p>
						<input
							autoCapitalize="off"
							autoCorrect="off"
							autoComplete="off"
							className={"fen-input"}
							onChange={this._onFenChanged.bind(this)}
							size="70"
							spellCheck="false"
							type="text"
							value={this.state.fen}
						/>
					</div>
					<div className="propGroup">
						<p> Square Size: </p>
						<input type="range" value={this.state.squareSize} min={10} max={100} step={1} onChange = {evt => {
							this.setState({squareSize: Number(evt.target.value)});
						}}/>
						<p>Flip Board ?<input type="checkbox" value={this.state.flip} onChange={this._onFlipChanged.bind(this)} /></p>
						<p>Light Square Color:<input type="color" value={this.state.lightSquareColor} onChange={this._onLightSquareColorChanged.bind(this)} /></p>
						<p>Dark Square Color:<input type="color" value={this.state.darkSquareColor} onChange={this._onDarkSquareColorChanged.bind(this)} /></p>
					</div>
					<div className="propGroup">
						<p>Game Type:{'\u00A0'}
							<select name="gameType" value={this.state.gameType} onChange={this._onGameTypeChange.bind(this)}>
								{Object.keys(this.gamePresets).map(gameType => (
									<option key={gameType} value={gameType}>{gameType}</option>
								))}
							</select>
						</p>
						<p>Ranks:<input type="range" value={this.state.ranks} min={2} max={16} onChange={this._onRanksChanged.bind(this)} /> {this.state.ranks}</p>
						<p>Files:<input type="range" value={this.state.files} min={2} max={16} onChange={this._onFilesChanged.bind(this)} /> {this.state.files}</p>
					</div>
					<p/>
				</div>
					<Chessdiagram
						darkSquareColor={this.state.darkSquareColor}
						fen={this.state.fen}
						gameHistory={this.state.gameHistory}
						startPosition={this.state.currentPosition}
						files={this.state.files}
						flip={this.state.flip}
						lightSquareColor={this.state.lightSquareColor}
						onMovePiece={this._onMovePiece.bind(this)}
						pgn={this.state.pgn}
						pieceDefinitions={this.gamePresets[this.state.gameType].pieceDefinitions}
						ranks={this.state.ranks}
						squareSize={this.state.squareSize}
					/>
					<p className={"lastMessage"}><strong>{this.state.lastMessage}</strong></p>

				{this.state.pgn ? <div style={{position: 'relative', top: 40}}>
					Displaying the following PGN:<br />
					<textarea
						cols={60}
						onChange={this._onPgnChanged.bind(this)}
						rows={20}
						value={this.state.pgn}
					/>
				</div> : null}
			</div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
