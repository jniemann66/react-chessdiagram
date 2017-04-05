/*

MIT License

Copyright (c) 2016 Judd Niemann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// chessdiagram.js : defines Chess Diagram Component

import React, { Component } from 'react';
import BoardContainer from './BoardContainer.js';
import GameHistory from './GameHistory.js';

/** Chessdiagram : draws a chess diagram consisting of a board and pieces, using svg graphics */
class Chessdiagram extends Component {
	constructor(props) {
		super(props);
		let currentMove;
		if (typeof props.startMove === 'number' || parseInt(props.startMove)) {
			// halfMove provided
			currentMove = parseInt(props.startMove);
		} else {
			// e.g., 'w12'
			currentMove = (parseInt(props.startMove.slice(1)) - 1) * 2 + (props.startMove[0] === 'w' ? 1 : 2);
		}

		this.state = {
			currentMove: currentMove,
			currentPosition: props.pgn ? props.getNthMove(props.pgn, currentMove) : props.fen
		};
	}

	// Lifecycle events
	componentWillReceiveProps(nextProps) {
		if (nextProps.fen && nextProps.fen !== this.props.fen) {
			this.setState({currentPosition: nextProps.fen});
		}
		if (nextProps.pgn && nextProps.pgn !== this.props.pgn) {
			this.setState({currentPosition: this.props.getNthMove(nextProps.pgn, 0)});
		}
	}

	// event handling ////

	_onMovePiece(pieceType, from, to) {
		if (this.props.allowMoves) {
			this.props.onMovePiece(pieceType, from, to);
		}
	}

	_onMovePgnHead(halfMove) {
		this.setState({
			currentMove: halfMove,
			currentPosition: this.props.getNthMove(this.props.pgn, halfMove)
		});
	}

	// render function

	render() {
		return (
			<div>
				<BoardContainer
					{...this.props}
					fen={this.state.currentPosition}
					style={{display: 'inline-block'}}
					onMovePiece={this._onMovePiece.bind(this)}
				/>
				{this.props.gameHistory ?
					<GameHistory
						style={{display: 'inline-block'}}
						currentMove={this.state.currentMove}
						newlineChar={this.props.newlineChar}
						moveHead={this._onMovePgnHead.bind(this)}
						pgn={this.props.pgn}
					/> : null
				}
			</div>
		);
	}
}

Chessdiagram.propTypes = {
	/** Whether to allow the user to make moves on the board (ie, whether to ignore mouse input) */
	allowMoves: React.PropTypes.bool,
	darkSquareColor: React.PropTypes.string,
	/** Fen string to render. Should override  */
	fen: React.PropTypes.string,
	files: React.PropTypes.number,
	/** if true, rotates the board so that Black pawns are moving up, and White pawns are moving down the board */
	flip: React.PropTypes.bool,
	/** whether to render a GameHistory component */
	gameHistory: React.PropTypes.bool,
	/** Takes a pgn and returns the FEN of the nth move.
	* Chessdiagram can take a custom callback here, with the following params:
	* pgn: string that can be parsed as a normal pgn (eg, double linebreak b/w header
	* and move text, moves in the format `<fullmoveNumber>. <whiteMove> <blackMove>`
	* or /\d+\.\s\w+(?:\s\w+)?/ )
	* move: half move (so if you want 1. e4, you'd pass 1. If you want 2 ... Nf6,
	* you'd pass 4). If passed 0, should return the start position. Should be
	* stateless.*/
	getNthMove: React.PropTypes.func,
	/** height of main svg container in pixels. If setting this manually, it should be at least 9 * squareSize to fit board AND labels*/
	height: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
	]),
	lightSquareColor: React.PropTypes.string,
	/** Pgn line separator. Defaults to '\r?\n'*/
	newlineChar: React.PropTypes.string,
	/** callback function which is called when user moves a piece. Passes pieceType, initialSquare, finalSquare as parameters to callback */
	onMovePiece: React.PropTypes.func,
	/** callback for when user changes which move in a pgn they are viewing. called
	* with the direction that we're moving */
	onMovePgnHead: React.PropTypes.func,
	/** callback function which is called when user clicks on a square. Passes name of square as parameter to callback */
	onSelectSquare: React.PropTypes.func,
	/** String representation of a PGN. Note that chess.js can't handle templates,
	* so if you'd like to pass templates you'll need a custom getNthMove callback.*/
	pgn: React.PropTypes.string,
	/** Height of pgn viewer component */
	pgnHeight: React.PropTypes.number,
	/** array of pieces at particular squares (alternative to fen) eg ['P@f2','P@g2','P@h2','K@g1'].
	* This format may be more suitable for unconventional board dimensions, for which standard FEN would not work.
	* Note: If both FEN and pieces props are present, FEN will take precedence */
	pieces: React.PropTypes.array,
	/** Optional associative array containing non-standard chess characters*/
	pieceDefinitions: React.PropTypes.object,
	ranks: React.PropTypes.number,
	/** size of the squares in pixels */
	squareSize: React.PropTypes.number,
	// Which move to start the game on. Either halfmove count or letter followed by full move eg w12 //
	startMove: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number
	]),
	/** Chess position in FEN format (Forsyth-Edwards Notation). eg "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" */
	startPosition: React.PropTypes.string,
	/** width of main svg container in pixels. If setting this manually, it should be at least 9 * squareSize to fit board AND labels*/
	width: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
	]),
};

/** Takes a pgn and returns the FEN of the nth move.
* Chessdiagram can take a custom callback here, with the following params:
* pgn: string that can be parsed as a normal pgn (eg, double linebreak b/w header
* and move text, moves in the format `<fullmoveNumber>. <whiteMove> <blackMove>`
* or /\d+\.\s\w+(?:\s\w+)?/ )
* move: half move (so if you want 1. e4, you'd pass 1. If you want 2 ... Nf6,
* you'd pass 4). If passed 0, should return the start position. Should be
* stateless.
*/
const getNthMoveDefault = (pgn, move) => {

	var Game = require('chess.js'); // eslint-disable-line no-undef
	if (Game.Chess) { // HACK: make it work in the test suite
		Game = Game.Chess;
	}
	var game = new Game();
	if (move === 0) {
		return game.fen();
	}
	game.load_pgn(pgn);

	for (let i = game.history().length - move; i > 0; i--) {
		game.undo();
	}
	return game.fen();
};

Chessdiagram.defaultProps = {
	allowMoves: true,
	darkSquareColor:  "#005EBB",
	height: 'auto',
	files: 8,
	flip: false,
	gameHistory: false,
	getNthMove: getNthMoveDefault,
	lightSquareColor: "#2492FF",
	newlineChar: '\r?\n',
	pieceDefinitions: {},
	pgnHeight: 400,
	ranks: 8,
	startMove: 0,
	squareSize: 45,
	width: 'auto',
};


export default Chessdiagram;
