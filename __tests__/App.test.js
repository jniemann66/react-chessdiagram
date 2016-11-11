import React from 'react';
import { mount, shallow } from 'enzyme';
import Chessdiagram from '../src/chessdiagram';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

const startPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

describe('When selecting squares at each corner of 8x8 board', () => {
	it('should return correct names of squares (a1,h1,h8,a8)', () => {
		let spySelectSquare = sinon.spy();
		
		const wrapper = mount(
			<Chessdiagram onSelectSquare={spySelectSquare} ranks={8} files={8}/>
		);
		
		console.log(wrapper.state());
		let squareSize = wrapper.props().squareSize;
		let ranks = wrapper.props().ranks;
		let files = wrapper.props().files;
		let halfSquareSize = squareSize / 2; // offset to place coordinate in _middle_ of square
		
		let a1Coords = {
			clientX: squareSize + halfSquareSize, // NOTE: labels expected at column 0; board starts at column 1
			clientY: (ranks - 1) * squareSize + halfSquareSize
		};

		let h1Coords = {
			clientX: 8 * squareSize + halfSquareSize,
			clientY: (ranks - 1) * squareSize + halfSquareSize
		};

		let h8Coords = {
			clientX: 8 * squareSize + halfSquareSize,
			clientY: halfSquareSize
		};

		let a8Coords = {
			clientX: squareSize + halfSquareSize,
			clientY: halfSquareSize
		}; 
	
		// simulate a click on each corner square
		wrapper.simulate('mousedown', a1Coords);
		wrapper.simulate('mousedown', h1Coords);
		wrapper.simulate('mousedown', h8Coords);
		wrapper.simulate('mousedown', a8Coords);

		expect(spySelectSquare.calledWith('a1')).toBe(true);
		expect(spySelectSquare.calledWith('h1')).toBe(true);
		expect(spySelectSquare.calledWith('h8')).toBe(true);
		expect(spySelectSquare.calledWith('a8')).toBe(true);

		wrapper.unmount();

	});
});

describe('When moving pawn from e2-e4 on 8x8 board', () => {
	it('should return piece and names of squares (P,e2,e4)', () => {
		let spyMovePiece = sinon.spy();
		
		const wrapper = mount(
			<Chessdiagram onMovePiece={spyMovePiece} ranks={8} files={8} fen={startPosition}/>
		);
		
		console.log(wrapper.state());
		let squareSize = wrapper.props().squareSize;
		let ranks = wrapper.props().ranks;
		let files = wrapper.props().files;
		let halfSquareSize = squareSize / 2; // offset to place coordinate in _middle_ of square
		
		let e2Coords = {
			clientX: 5 * squareSize + halfSquareSize, // NOTE: labels expected at column 0; board starts at column 1
			clientY: (ranks - 2) * squareSize + halfSquareSize
		};

		let e4Coords = {
			clientX: 5 * squareSize + halfSquareSize,
			clientY: (ranks - 4) * squareSize + halfSquareSize
		};
	
		// simulate mousedown on e2
		wrapper.simulate('mousedown', e2Coords);

		// simulate mouseup on e4
		wrapper.simulate('mouseup', e4Coords);

		expect(spyMovePiece.calledWith('P','e2','e4')).toBe(true);

		wrapper.unmount();

	});
});







/*

describe('Welcome (Snapshot)', () => {
  it('Welcome renders hello world', () => {
    const component = renderer.create(<Chessdiagram />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

*/