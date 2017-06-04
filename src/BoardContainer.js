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

import React, { Component } from 'react';
import Board from './board.js';
import Piece from './piece.js';
import standardPieceDefinitions from './pieceDefinitions.js';
import PropTypes from 'prop-types';


/** BoardContainer : handles user input and draws a chess diagram consisting of
* a board and pieces, using svg graphics */
class BoardContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSquare: null,
			selectedPieceType: null,
			dragX: 0,
			dragY: 0,
			isDragging: false,
			left: 0,
			top: 0,
			width: 0,
			height: 0,
		};
	}

	// Lifecycle events ////

	componentDidMount() {
		this._getClientPos();
		// add DOM events
		addEventListener('resize', this._onResize.bind(this)); // resize event not provided by React events; use DOM version
		addEventListener('scroll', this._onScroll.bind(this));
	}

	componentWillUnmount() {
		removeEventListener('resize', this._onResize.bind(this));
		removeEventListener('scroll', this._onScroll.bind(this));
	}

	componentWillReceiveProps (nextProps) {
		if ( /* changes which have an effect on coordinates */
			nextProps.squareSize !== this.props.squareSize ||
			nextProps.ranks !== this.props.ranks ||
			nextProps.files !== this.props.files
		) {
			let evt = new Event('resize');
			dispatchEvent(evt); // synthetically trigger resize event. (Can't get coords in here, because component not rendered yet ...)
		}
	}

	// event handling ////

	// DOM events
	_onResize() {
		this._getClientPos();
	}

	_onScroll() {
		this._getClientPos();
	}

	// react events
	_onMouseDown(evt) { // react event
		evt.preventDefault();
		let x = evt.clientX - this.state.left;
		let y = evt.clientY - this.state.top;
		this._grab(x,y);
	}

	_onTouchStart(evt) {
		evt.preventDefault();
		let x = evt.touches[0].clientX - this.state.left;
		let y = evt.touches[0].clientY - this.state.top;
		this._grab(x,y);
	}

	_onMouseMove(evt) {
		evt.preventDefault();
		let x = evt.clientX - this.state.left;
		let y = evt.clientY - this.state.top;
		this._move(x,y);
	}

	_onTouchMove(evt) {
		evt.preventDefault();
		let x = evt.touches[0].clientX - this.state.left;
		let y = evt.touches[0].clientY - this.state.top;
		this._move(x,y);
	}

	_onMouseUp(evt) {
		evt.preventDefault();
		let x = evt.clientX - this.state.left;
		let y = evt.clientY - this.state.top;
		this._release(x,y);
	}

	_onTouchEnd(evt) {
		evt.preventDefault();
		/* // Note: android doesn't populate touches array on touchend
		let x = evt.touches[0].clientX - this.state.left;
		let y = evt.touches[0].clientY - this.state.top;
		*/
		let [x,y] = [this.state.dragX, this.state.dragY];

		this._release(x,y);
	}

	// coordinate conversion functions ////

	_squareToCoords(square) { // convert a square name (eg 'e4') to coordinates
		if(this.props.flip) {
			let x = this.props.squareSize * (this.props.files - (square.toLowerCase().charCodeAt(0)-97));
			let y = (Number(square.slice(1))-1) * this.props.squareSize;
			return [x,y];
		} else {
			let x = this.props.squareSize * (1 + square.toLowerCase().charCodeAt(0)-97);
			let y = (this.props.ranks-Number(square.slice(1))) * this.props.squareSize;
			return [x,y];
		}
	}

	_fileRankToCoords(file, rank) { // convert zero-based file and rank values to coordinates
		if(this.props.flip) {
			let	x = this.props.squareSize * (this.props.files - file);
			let y = this.props.squareSize * rank;
			return [x,y];
		} else {
			let	x = this.props.squareSize * (1 + file);
			let y = this.props.squareSize * (this.props.ranks - rank -1);
			return [x,y];
		}
	}

	_coordsToSquare(x,y) { // convert coordinates to square name (eg e4)
		if(this.props.flip) {
			let file = String.fromCharCode(97 + this.props.files - x / this.props.squareSize + 1);
			let rank = 1 + Math.floor(y / this.props.squareSize);
			return file + rank;
		} else {
			let file = String.fromCharCode(97 + x / this.props.squareSize - 1);
			let rank = 1 + Math.floor((this.props.ranks * this.props.squareSize - y) / this.props.squareSize);
			return file + rank;
		}
	}

	// private actions

	_grab(x,y) {
		let boardW = this.props.squareSize * (1+this.props.files);
		let boardH = this.props.squareSize * (this.props.ranks);
		if(x < this.props.squareSize || x > boardW || y < 0 || y > boardH) {
			//outside the board ...
			return false;
		}
		let selectedSquare = this._coordsToSquare(x,y);
		let selectedPiece = this._getPieceAtSquare(selectedSquare);
		if (!this.state.selectedSquare || this.state.selectedSquare === selectedSquare) {
			this.setState({
				selectedSquare: selectedSquare,
				selectedPieceType: selectedPiece ? selectedPiece.pieceType : null,
				dragX: selectedPiece ? selectedPiece.x + this.props.squareSize / 2: this.state.dragX,
				dragY: selectedPiece ? selectedPiece.y + this.props.squareSize / 2: this.state.dragY,
				isDragging: true
			});
		}

		if(this.props.onSelectSquare) {
			this.props.onSelectSquare(selectedSquare);
		}
	}

	_move(x, y) {
		if(this.state.isDragging) {
			this.setState({dragX: x, dragY: y});
		}
	}

	_release(x,y) {
		this.setState({isDragging: false});
		let finalSquare = this._coordsToSquare(x,y);
		if(finalSquare !== this.state.selectedSquare) {
			if(this.props.onMovePiece) { // call the callback fn
				this.props.onMovePiece(this.state.selectedPieceType, this.state.selectedSquare, finalSquare);
			}
			this.setState({selectedSquare: null});
		}
	}

	// self-enquiry ////

	_getClientPos() {
		let rect = this.Client.getBoundingClientRect();
		this.setState({left: rect.left, top: rect.top, width: rect.width, height: rect.height});
	}

	_getPieces() {
		if(!this.props.pieces)
			return [];

		return this.props.pieces.map((pieceString) => {
			let [pieceType, square ] = pieceString.split('@',2);	// split 'piece@square' into pieceType, square
			if(!square)
				return {pieceType: 'invalid', square: 'none', x: 0,y: 0}; // guard against nonsense input
			let [x,y] = this._squareToCoords(square);
			if (isNaN(y))
				return {pieceType: 'invalid', square: 'none', x: 0,y: 0}; // invalid y-coordinate
			return {pieceType: pieceType, square: square.toLowerCase(), x: x, y: y};
		});
	}

	_getPiecesFromFEN() {
		let fields = this.props.fen.split(" ", 6);
		const pieceDefinitions = Object.assign(standardPieceDefinitions, this.props.pieceDefinitions);
		const pieceChars = new RegExp('[' + Object.keys(pieceDefinitions).join('').replace('-', '\\-') + ']');
		const splitFen = fields[0].replace(/(\d+|\w|\/)(?!$)/g, '$1,').split(',');
		return splitFen
			.reduce((accum, c) => {
				if(pieceChars.test(c)) {
					let [x,y] = this._fileRankToCoords(accum.file, accum.rank);
					let square = String.fromCharCode(97 + accum.file) + (accum.rank + 1).toString();
					accum.pieces.push({pieceType: c, square: square, x: x, y: y});
					accum.file++;
				} else if (c === "/") {
					accum.rank -= 1;
					accum.file = 0;
				}	else if(Number.isInteger(parseInt(c))) {
					accum.file += Number(c);
				}
				return accum;
			}, {
				rank: this.props.ranks-1,
				file: 0,
				pieces: []
			})
			.pieces;
	}

	_getPieceAtSquare(square) {
		let pieces = this.props.fen ? this._getPiecesFromFEN() : this._getPieces();
		return pieces.filter(pieceLocation => pieceLocation.square === square)[0];
	}

	// render function

	render() {
		// TODO: Allow user-defined highlight colors
		let pieces = this.props.fen ? this._getPiecesFromFEN() : this._getPieces();
		const pieceDefinitions = Object.assign(standardPieceDefinitions, this.props.pieceDefinitions);
		const highlights = {};
		if (this.state.selectedSquare) {
			highlights[this.state.selectedSquare] = 'yellow';
		}
		return (
				<svg
					ref={(svg) => {this.Client = svg;}}
					style={{display: 'inline-block'}}
					height={this.props.height === "auto" ? (1 + this.props.ranks) * this.props.squareSize : this.props.height}
					onMouseDown={this._onMouseDown.bind(this)}
					onMouseMove={this._onMouseMove.bind(this)}
					onTouchEnd={this._onTouchEnd.bind(this)}
					onTouchMove={this._onTouchMove.bind(this)}
					onTouchStart={this._onTouchStart.bind(this)}
					onMouseUp={this._onMouseUp.bind(this)}
					width={this.props.width === "auto" ? (1 + this.props.files) * this.props.squareSize : this.props.width}
				>

					<Board
						darkSquareColor={this.props.darkSquareColor}
						files={this.props.files}
						flip={!!this.props.flip}
						highlights={highlights}
						lightSquareColor={this.props.lightSquareColor}
						ranks={this.props.ranks}
						selectedSquare={this.state.selectedSquare}
						squareSize={this.props.squareSize}
					/>

					{pieces.map((piece, i) =>
						<Piece
							x={this.state.isDragging && piece.square === this.state.selectedSquare ? this.state.dragX - this.props.squareSize / 2 : piece.x}
							y={this.state.isDragging && piece.square === this.state.selectedSquare ? this.state.dragY - this.props.squareSize / 2 : piece.y}
							key={i} pieceType={piece.pieceType} squareSize={this.props.squareSize}
							drawPiece={pieceDefinitions[piece.pieceType]}
						/>
					)}

				</svg>
		);
	}
}
BoardContainer.propTypes = {
	/** Dictionary of legal moves, to be supplied by server*/
	allowedMoves: PropTypes.object,
	darkSquareColor: PropTypes.string,
	/** Chess position in FEN format (Forsyth-Edwards Notation). eg "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" */
	fen: PropTypes.string,
	files: PropTypes.number,
	/** if true, rotates the board so that Black pawns are moving up, and White pawns are moving down the board */
	flip: PropTypes.bool,
	/** height of main svg container in pixels. If setting this manually, it should be at least 9 * squareSize to fit board AND labels*/
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	lightSquareColor: PropTypes.string,
	/** callback function which is called when user moves a piece. Passes pieceType, initialSquare, finalSquare as parameters to callback */
	onMovePiece: PropTypes.func,
	/** callback function which is called when user clicks on a square. Passes name of square as parameter to callback */
	onSelectSquare: PropTypes.func,
	/** array of pieces at particular squares (alternative to fen) eg ['P@f2','P@g2','P@h2','K@g1'].
	* This format may be more suitable for unconventional board dimensions, for which standard FEN would not work.
	* Note: If both FEN and pieces props are present, FEN will take precedence */
	pieces: PropTypes.array,
	/** Optional associative array containing non-standard chess characters*/
	pieceDefinitions: PropTypes.object,
	ranks: PropTypes.number,
	squareSize: PropTypes.number,
	/** width of main svg container in pixels. If setting this manually, it should be at least 9 * squareSize to fit board AND labels*/
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

BoardContainer.defaultProps = {
	allowedMoves: {},
	darkSquareColor:  "#005EBB",
	height: 'auto',
	files: 8,
	flip: false,
	lightSquareColor: "#2492FF",
	pieceDefinitions: {},
	ranks: 8,
	squareSize: 45,
	width: 'auto',
};

export default BoardContainer;
