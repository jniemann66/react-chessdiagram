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
import './piece.css';
import PropTypes from 'prop-types';


/** Piece: renders an svg chess piece of a given type and position */
class Piece extends Component {

	shouldComponentUpdate(nextProps) {
		return (nextProps.x !== this.props.x || nextProps.y !== this.props.y || nextProps.pieceType !== this.props.pieceType || nextProps.squareSize !== this.props.squareSize);
	}

	render() {
		let scale = this.props.squareSize / 45; // coordinates for drawings are based on square size of 45
		let transformString = 'translate(' + this.props.x + ',' + this.props.y + ') scale(' + scale + ')';
		return this.props.drawPiece(transformString);
	}
}

// TODO: remove pieceType, only check to see if drawPiece has changed in shouldComponentUpdate
Piece.propTypes = {
	drawPiece: PropTypes.func.isRequired,
	pieceType: PropTypes.string.isRequired,
	squareSize: PropTypes.number.isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	/** recognized piece types: K,Q,R,B,N,P,k,q,r,b,n,p */
};

export default Piece;
