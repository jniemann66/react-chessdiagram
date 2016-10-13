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

	render() {

		let rankLabels = [];
		for (let rank=0; rank < this.props.ranks; rank++) {
			rankLabels.push({y: this.props.squareSize / 2 + (this.props.ranks -1 - rank) * this.props.squareSize, label: rank + 1});
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
			fileLabels.push({x: this.props.squareSize / 2 + (1 + file) * this.props.squareSize, label: String.fromCharCode(97 + file)});
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
	render() {
		
		let squares = [];

		// push coordinates into array
		for (let file=0; file < this.props.files; file++){
			for (let rank=0; rank < this.props.ranks; rank++) {
				squares.push({x: (1+file) * this.props.squareSize, y: (this.props.ranks -1 - rank) * this.props.squareSize, light: (file ^ rank) & 1});
			}
		}

		let selectedSquareX, selectedSquareY;
		if(this.props.selectedSquare) {
			selectedSquareX = this.props.squareSize * (1 + this.props.selectedSquare.toLowerCase().charCodeAt(0)-97);
			selectedSquareY = (this.props.ranks-Number(this.props.selectedSquare.slice(1))) * this.props.squareSize;
		}
		return (
			
			<svg>
				{squares.map((square,i) => 
					<Square 
						x={square.x} y={square.y} key={i} light={square.light} squareSize={this.props.squareSize}
						lightSquareColor={this.props.lightSquareColor} darkSquareColor={this.props.darkSquareColor}
					/>
				)}

				<RankLabels ranks={this.props.ranks} files={this.props.files} squareSize={this.props.squareSize}/>
				<FileLabels ranks={this.props.ranks} files={this.props.files} squareSize={this.props.squareSize}/>
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
}

Board.defaultProps = {
	squareSize: 45,
	ranks: 8,
	files: 8,
	lightSquareColor: "#2492FF",
	darkSquareColor:  "#005EBB",
}

export default Board;