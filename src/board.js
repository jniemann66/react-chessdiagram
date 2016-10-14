import React, { Component } from 'react';

class Square extends Component {
	render() {
		let fillColor = this.props.light ? this.props.lightSquareColor : this.props.darkSquareColor; 
		return <rect x={this.props.x} y={this.props.y} width={this.props.squareSize} height={this.props.squareSize} stroke="black" fill={fillColor} strokeWidth="1" />;
	}
}

class SquareHighlight extends Component {
	render() {
		let highlightColor = "yellow";
		return <rect x={this.props.x} y={this.props.y} width={this.props.squareSize} height={this.props.squareSize} stroke={highlightColor} fill="none" strokeWidth="3" />;
	}
}

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
		)
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
		)
	}
}

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

	shouldComponentUpdate(nextProps) {
		return ( // note: put most likely changes towards the top ...
			nextProps.squareSize !== this.props.squareSize ||
			nextProps.flip !== this.props.flip ||
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

		let selectedSquareX, selectedSquareY;
		if(this.props.selectedSquare) {
			[selectedSquareX, selectedSquareY] = this._squareToCoords(this.props.selectedSquare);
		}
		return (
			
			<svg>
				{squares.map((square,i) => 
					<Square 
						x={square.x} y={square.y} key={i} light={square.light} squareSize={this.props.squareSize}
						lightSquareColor={this.props.lightSquareColor} darkSquareColor={this.props.darkSquareColor}
					/>
				)}

				<RankLabels ranks={this.props.ranks} files={this.props.files} squareSize={this.props.squareSize} flip={this.props.flip}/>
				<FileLabels ranks={this.props.ranks} files={this.props.files} squareSize={this.props.squareSize} flip={this.props.flip}/>
				{(() => this.props.selectedSquare ? <SquareHighlight x={selectedSquareX} y={selectedSquareY} squareSize={this.props.squareSize}/> : <g/> )()}
			</svg>
		);			
	}
}	

Board.propTypes = {
	squareSize: React.PropTypes.number,
	ranks: React.PropTypes.number,
	files: React.PropTypes.number,
	lightSquareColor: React.PropTypes.string,
	darkSquareColor: React.PropTypes.string,
	flip: React.PropTypes.bool,
}

Board.defaultProps = {
	squareSize: 45,
	ranks: 8,
	files: 8,
	lightSquareColor: "#2492FF",
	darkSquareColor:  "#005EBB",
	flip: false,
}

export default Board;