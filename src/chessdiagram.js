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
import PropTypes from 'prop-types';


/** Chessdiagram : draws a chess diagram consisting of a board and pieces, using svg graphics */
class Chessdiagram extends Component {
	constructor(props) {
		super(props);

		// If FEN is present, and it is an array, use it for moves
		// If FEN is present, and it is a string, make it the first element of the moves array.
		// If FEN is NOT present, and PGN is present, call getFensFromPgn() to generate an array of FENs
		// If FEN is NOT present, and PGN is NOT present, make first element of moves array an empty string
		const moves = props.fen ?
			Array.isArray(props.fen) ? props.fen : [props.fen]
			: props.pgn ? props.getFensFromPgn(props.pgn) : [''];

		// If there is a PGN, set currentMove to this.startMove, otherwise zero.
		const currentMove = props.pgn ? this.startMove : 0;
		this.state = {
			currentMove,
			moves
		};
	}

	// Lifecycle events
	componentWillReceiveProps(nextProps) {
		if (nextProps.fen && nextProps.fen !== this.props.fen) {
			this.setState({currentMove: 0, moves: [nextProps.fen]});
		}
		if (nextProps.pgn && nextProps.pgn !== this.props.pgn) {
			this.setState({currentMove: this.startMove, moves: nextProps.getFensFromPgn(nextProps.pgn)});
		}
	}

	// event handling ////

	_onMovePiece(pieceType, from, to) {
		if (this.props.allowMoves && this.props.onMovePiece) {
			this.props.onMovePiece(pieceType, from, to);
		}
	}

	_onMovePgnHead(halfMove) {
		this.setState({
			currentMove: halfMove
		});
	}

	// returns halfmove count of the prop startMove ////
	get startMove() {
		let currentMove;
		if (typeof this.props.startMove === 'number' || parseInt(this.props.startMove)) {
			// halfMove provided
			currentMove = parseInt(this.props.startMove);
		} else {
			// e.g., 'w12'
			currentMove = (parseInt(this.props.startMove.slice(1)) - 1) * 2 + (this.props.startMove[0] === 'w' ? 1 : 2);
		}
		return currentMove;
	}

	// render function

	render() {
		return (
			<div>
				<BoardContainer
					{...this.props}
					fen={this.state.moves[this.state.currentMove]}
					style={{display: 'inline-block'}}
					onMovePiece={this._onMovePiece.bind(this)}
				/>
				{this.props.gameHistory ?
					<GameHistory
						currentMove={this.state.currentMove}
						getHeader={this.props.getHeader}
						getMovetext={this.props.getMovetext}
						getResult={this.props.getResult}
						getRows={this.props.getRows}
						moveHead={this._onMovePgnHead.bind(this)}
						newlineChar={this.props.newlineChar}
						pgn={this.props.pgn}
						style={{display: 'inline-block'}}
					/> : null
				}
			</div>
		);
	}
}

Chessdiagram.propTypes = {
	/** Whether to allow the user to make moves on the board (ie, whether to ignore mouse input) */
	allowMoves: PropTypes.bool,
	darkSquareColor: PropTypes.string,
	/** Fen string to render. Should override  */
	fen: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]),
	files: PropTypes.number,
	/** if true, rotates the board so that Black pawns are moving up, and White pawns are moving down the board */
	flip: PropTypes.bool,
	/** whether to render a GameHistory component */
	gameHistory: PropTypes.bool,
	/** Optional custom callbacks for PGN parsing. should take pgn (string).
	*/
	getFensFromPgn: PropTypes.func,
	getHeader: PropTypes.func,
	getMovetext: PropTypes.func,
	getResult: PropTypes.func,
	/** Returns an array of arrays, containing [<fullmoveNumber>, <whiteMove> <optionalBlackMove>] */
	getRows: PropTypes.func,
	/** height of main svg container in pixels. If setting this manually, it should be at least 9 * squareSize to fit board AND labels*/
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	lightSquareColor: PropTypes.string,
	/** Pgn line separator. Defaults to '\r?\n'*/
	newlineChar: PropTypes.string,
	/** callback function which is called when user moves a piece. Passes pieceType, initialSquare, finalSquare as parameters to callback */
	onMovePiece: PropTypes.func,
	/** callback function which is called when user clicks on a square. Passes name of square as parameter to callback */
	onSelectSquare: PropTypes.func,
	/** String representation of a PGN. Note that chess.js can't handle templates,
	* so if you'd like to pass templates you'll need a custom getNthMove callback.*/
	pgn: PropTypes.string,
	/** Height of pgn viewer component */
	pgnHeight: PropTypes.number,
	/** array of pieces at particular squares (alternative to fen) eg ['P@f2','P@g2','P@h2','K@g1'].
	* This format may be more suitable for unconventional board dimensions, for which standard FEN would not work.
	* Note: If both FEN and pieces props are present, FEN will take precedence */
	pieces: PropTypes.array,
	/** Optional associative array containing non-standard chess characters*/
	pieceDefinitions: PropTypes.object,
	ranks: PropTypes.number,
	/** size of the squares in pixels */
	squareSize: PropTypes.number,
	// Which move to start the game on. Either halfmove count or letter followed by full move eg w12 //
	startMove: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	/** Chess position in FEN format (Forsyth-Edwards Notation). eg "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" */
	startPosition: PropTypes.string,
	/** width of main svg container in pixels. If setting this manually, it should be at least 9 * squareSize to fit board AND labels*/
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

const getFensFromPgnDefault = (pgn) => {
	var Game = require('chess.js'); // eslint-disable-line no-undef
	if (Game.Chess) { // HACK: make it work in the test suite
		Game = Game.Chess;
	}
	const game = new Game();
	if (!pgn) {
		return [game.fen()];
	}
	game.load_pgn(pgn);
	let moves = [game.fen()];
	while (true) {
		const result = game.undo();
		if (result) {
			moves.push(game.fen());
		} else {
			break;
		}
	}
	moves = moves.reverse();
	return moves;
};

Chessdiagram.defaultProps = {
	allowMoves: true,
	darkSquareColor:  "#005EBB",
	height: 'auto',
	files: 8,
	flip: false,
	gameHistory: false,
	getFensFromPgn: getFensFromPgnDefault,
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
