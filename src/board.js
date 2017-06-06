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
import PropTypes from 'prop-types';

class Square extends Component {
	render() {
		let fillColor = this.props.light ? this.props.lightSquareColor : this.props.darkSquareColor;
		return (
			<rect
				fill={fillColor}
				height={this.props.squareSize}
				stroke="black"
				strokeWidth="1"
				width={this.props.squareSize}
				x={this.props.x}
				y={this.props.y}
			/>
		);
	}
}

Square.propTypes = {
	darkSquareColor: PropTypes.string.isRequired,
	light: PropTypes.bool.isRequired,
	lightSquareColor: PropTypes.string.isRequired,
	squareSize: PropTypes.number.isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
};
Square.displayName = 'Square';

class SquareHighlight extends Component {
	render() {
		return <rect x={this.props.x} y={this.props.y} width={this.props.squareSize} height={this.props.squareSize} stroke={this.props.highlightColor} fill="none" strokeWidth="3" />;
	}
}

SquareHighlight.propTypes = {
	highlightColor: PropTypes.string.isRequired,
	squareSize: PropTypes.number.isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
};

SquareHighlight.defaultProps = {
	highlightColor: 'yellow'
};

class RankLabels extends Component {

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

	render() {

		let rankLabels = [];
		for (let rank=0; rank < this.props.ranks; rank++) {
			let y0 = this.props.flip ? rank : this.props.ranks - rank -1;
			rankLabels.push({y: this.props.squareSize / 2 + y0 * this.props.squareSize, label: rank + 1});
		}

		return (
			<g>
				{rankLabels.map((rankLabel, i) =>
					<text x={this.props.squareSize / 2} y={rankLabel.y} key={i} fontFamily="Verdana" fontSize={this.props.squareSize / 3} textAnchor="middle">
						{rankLabel.label}
					</text>)}
			</g>
		);
	}
}

class FileLabels extends Component {

	render() {

		let fileLabels = [];
		for (let file=0; file < this.props.files; file++) {
			let x0 = this.props.flip ? this.props.files - file : 1 + file;
			fileLabels.push({x: this.props.squareSize / 2 + x0 * this.props.squareSize, label: String.fromCharCode(97 + file)});
		}

		return (
			<g>
				{fileLabels.map((fileLabel, i) =>
					<text x={fileLabel.x} y={this.props.squareSize / 2 + this.props.ranks * this.props.squareSize} key={i} fontFamily="Verdana" fontSize={this.props.squareSize / 3} textAnchor="middle">
						{fileLabel.label}
					</text>)}
			</g>
		);
	}
}

const LabelPropTypes = {
	files: PropTypes.number,
	flip: PropTypes.bool.isRequired,
	ranks: PropTypes.number,
	squareSize: PropTypes.number.isRequired,
};

RankLabels.propTypes = LabelPropTypes;
FileLabels.propTypes = LabelPropTypes;

/** Board : draws a chess board with given square size, square colors, and number of files and ranks */
class Board extends Component {

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

	// 0-based index to algebraic notation (0 == 'a1', 1 == 'a2', ... 63 == 'h8' on an 8x8)
	_indexToSquare(index) {
		const file = "abcdefghijklmno"[Math.floor(index / this.props.files)];
		const rank = (index % this.props.files) + 1;
		return file + rank;
	}

	shouldComponentUpdate(nextProps) {
		return ( // note: put most likely changes towards the top ...
			nextProps.selectedSquare !== this.props.selectedSquare ||
			nextProps.flip !== this.props.flip ||
			nextProps.squareSize !== this.props.squareSize ||
			nextProps.lightSquareColor !== this.props.lightSquareColor ||
			nextProps.darkSquareColor !== this.props.darkSquareColor ||
			nextProps.ranks !== this.props.ranks ||
			nextProps.files !== this.props.files
		);
	}

	// the render() function

	render() {
		let squares = [];

		// push coordinates into array
		for (let file=0; file < this.props.files; file++){
			for (let rank=0; rank < this.props.ranks; rank++) {
				let [x,y] = this._fileRankToCoords(file, rank);
				squares.push({x: x, y: y, light: (file ^ rank) & 1});
			}
		}
		return (

			<svg>
				{squares.map((square,i) =>
					<Square
						id={this._indexToSquare(i)}
						square={this._indexToSquare(i)}
						x={square.x} y={square.y} key={i} light={!!square.light} squareSize={this.props.squareSize}
						lightSquareColor={this.props.lightSquareColor} darkSquareColor={this.props.darkSquareColor}
					/>
				)}

				<RankLabels ranks={this.props.ranks} files={this.props.files} squareSize={this.props.squareSize} flip={this.props.flip}/>
				<FileLabels ranks={this.props.ranks} files={this.props.files} squareSize={this.props.squareSize} flip={this.props.flip}/>
				{Object.keys(this.props.highlights).map(square => {
					const [x, y] = this._squareToCoords(square);
					return (
						<SquareHighlight
							key={square}
							highlightColor={this.props.highlights[square]}
							squareSize={this.props.squareSize}
							x={x}
							y={y}
						/>);
				})}
			</svg>
		);
	}
}

Board.propTypes = {
	darkSquareColor: PropTypes.string.isRequired,
	files: PropTypes.number.isRequired,
	flip: PropTypes.bool.isRequired,
	highlights: PropTypes.object,
	lightSquareColor: PropTypes.string.isRequired,
	ranks: PropTypes.number.isRequired,
	selectedSquare: PropTypes.string,
	squareSize: PropTypes.number.isRequired,
};

Board.defaultProps = {
	darkSquareColor:  "#005EBB",
	files: 8,
	flip: false,
	highlights: {},
	lightSquareColor: "#2492FF",
	ranks: 8,
	squareSize: 45,
};

export default Board;
