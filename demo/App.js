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
				flip: true,
				gameHistory: true,
				ranks: 8,
				pieceDefinitions: {},
				pgn: ['[Event "Third Rosenwald Trophy"]',
				'[Site "New York, NY USA"]',
				'[Date "1956.10.17"]',
				'[EventDate "1956.10.07"]',
				'[Round "8"]',
				'[Result "0-1"]',
				'[White "Donald Byrne"]',
				'[Black "Robert James Fischer"]',
				'[ECO "D92"]',
				'[WhiteElo "?"]',
				'[BlackElo "?"]',
				'[PlyCount "82"]',
				'',
				'1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. d4 O-O 5. Bf4 d5 6. Qb3 dxc4',
				'7. Qxc4 c6 8. e4 Nbd7 9. Rd1 Nb6 10. Qc5 Bg4 11. Bg5 {11. Be2',
				'followed by 12 O-O would have been more prudent. The bishop',
				'move played allows a sudden crescendo of tactical points to be',
				'uncovered by Fischer. -- Wade} Na4 {!} 12. Qa3 {On 12. Nxa4',
				'Nxe4 and White faces considerable difficulties.} Nxc3 {At',
				'first glance, one might think that this move only helps White',
				'create a stronger pawn center; however, Fischer\'s plan is',
				'quite the opposite. By eliminating the Knight on c3, it',
				'becomes possible to sacrifice the exchange via Nxe4 and smash',
				'White\'s center, while the King remains trapped in the center.}',
				'13. bxc3 Nxe4 {The natural continuation of Black\'s plan.}',
				'14. Bxe7 Qb6 15. Bc4 Nxc3 16. Bc5 Rfe8+ 17. Kf1 Be6 {!! If',
				'this is the game of the century, then 17...Be6!! must be the',
				'counter of the century. Fischer offers his queen in exchange',
				'for a fierce attack with his minor pieces. Declining this',
				'offer is not so easy: 18. Bxe6 leads to a \'Philidor Mate\'',
				'(smothered mate) with ...Qb5+ 19. Kg1 Ne2+ 20. Kf1 Ng3+',
				'21. Kg1 Qf1+ 22. Rxf1 Ne2#. Other ways to decline the queen',
				'also run into trouble: e.g., 18. Qxc3 Qxc5} 18. Bxb6 Bxc4+',
				'19. Kg1 Ne2+ 20. Kf1 Nxd4+ {This tactical scenario, where a',
				'king is repeatedly revealed to checks, is sometimes called a',
				'"windmill."} 21. Kg1 Ne2+ 22. Kf1 Nc3+ 23. Kg1 axb6 24. Qb4',
				'Ra4 25. Qxb6 Nxd1 26. h3 Rxa2 27. Kh2 Nxf2 28. Re1 Rxe1',
				'29. Qd8+ Bf8 30. Nxe1 Bd5 31. Nf3 Ne4 32. Qb8 b5 {Every piece',
				'and pawn of the black camp is defended. The white queen has',
				'nothing to do.} 33. h4 h5 34. Ne5 Kg7 35. Kg1 Bc5+ 36. Kf1',
				'Ng3+ {Now Byrne is hopelessly entangled in Fischer\'s mating',
				'net.} 37. Ke1 Bb4+ 38. Kd1 Bb3+ 39. Kc1 Ne2+ 40. Kb1 Nc3+',
				'41. Kc1 Rc2# 0-1'].join('\n'),
					startMove: 'b11'
			},
			draughts: {
				fen: "1g1g1g1g1g/g1g1g1g1g1/1g1g1g1g1g/g1g1g1g1g1/10/10/1G1G1G1G1G/G1G1G1G1G1/1G1G1G1G1G/G1G1G1G1G1 w - - 0 1",
				files: 10,
				flip: false,
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
				flip: false,
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
						startMove={this.state.startMove}
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
