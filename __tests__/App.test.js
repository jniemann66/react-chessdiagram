import React from 'react';
import { mount, shallow } from 'enzyme';
import Chessdiagram from '../src/chessdiagram';
import Piece from '../src/piece';
import Board from '../src/board';
import BoardContainer from '../src/BoardContainer.js';
import GameHistory from '../src/GameHistory.js';
import sinon from 'sinon';

const startPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

describe('testing interpretation of FEN string', () => {
	it('should put pieces on the correct squares', () => {

		const pieces = {
			'a1': 'R', 'b1': 'N', 'c1': 'B', 'd1': 'Q', 'e1': 'K', 'f1': 'B', 'g1': 'N', 'h1': 'R',
			'a2': 'P', 'b2': 'P', 'c2': 'P', 'd2': 'P', 'e2': 'P', 'f2': 'P', 'g2': 'P', 'h2': 'P',
			'a7': 'p', 'b7': 'p', 'c7': 'p', 'd7': 'p', 'e7': 'p', 'f7': 'p', 'g7': 'p', 'h7': 'p',
			'a8': 'r', 'b8': 'n', 'c8': 'b', 'd8': 'q', 'e8': 'k', 'f8': 'b', 'g8': 'n', 'h8': 'r'
		};

		const occupiedSquares = Object.keys(pieces);

		const emptySquares = [
			'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
			'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
			'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
			'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
		];

		const wrapper = mount(
			<BoardContainer ref="cd" ranks={8} files={8} fen={startPosition} />
		);

		let instance = wrapper.instance();
		occupiedSquares.map((sq) => {
			expect(instance._getPieceAtSquare(sq).pieceType).toBe(pieces[sq]);
		});

		emptySquares.map((sq) => {
			expect(instance._getPieceAtSquare(sq)).toBe(undefined);
		});

		wrapper.unmount();

	});
});

describe('testing for elements being rendered correctly on 8x8 board', () => {
	it('should return 1 Board, 32 Pieces', () => {

		const wrapper = mount(
			<Chessdiagram ref="cd" ranks={8} files={8} fen={startPosition} />
		);
		expect(wrapper.find(Board).length).toBe(1);
		expect(wrapper.find(Piece).length).toBe(32);

		wrapper.unmount();
	});
});

describe('When selecting squares at each corner of 8x8 board', () => {
	it('should return correct names of squares (a1,h1,h8,a8)', () => {
		let spySelectSquare = sinon.spy();

		const wrapper = mount(
			<BoardContainer onSelectSquare={spySelectSquare} ranks={8} files={8} />
		);

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
			<BoardContainer onMovePiece={spyMovePiece} ranks={8} files={8} fen={startPosition} />
		);

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
		expect(spyMovePiece.calledWith('P', 'e2', 'e4')).toBe(true);

		wrapper.unmount();

	});
});

describe('testing for custom pieces being rendered correctly on 8x8 board', () => {
	it('should return 1 Board, 33 Pieces', () => {

		const wrapper = mount(
			<Chessdiagram ref="cd" ranks={8} files={8}
			fen={"rnbqkbnr/pppppppp/a7/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}
			pieceDefinitions={{'a': (transformString) => (
        <image
          height={45}
          href={"https://upload.wikimedia.org/wikipedia/commons/d/d0/Guard_%28an_icon_of_the_chess_piece%29_Classical_Version.png"}
          transform={transformString}
          width={45}
        />)}}
			/>
		);
		expect(wrapper.find(Board).length).toBe(1);
		expect(wrapper.find(Piece).length).toBe(33);

		wrapper.unmount();
	});
});

describe('testing non-standard board widths', () => {
	it('should return 4 squares on 2x2', () => {
		const wrapper = mount(
			<Chessdiagram ref="cd" ranks={2} files={2}
				fen={"2/2 w - - 0 1"}
			/>
		);
		expect(wrapper.find('Square').length).toBe(4);
	});

	it('should return 144 squares on 12x12', () => {
		const wrapper = mount(
			<Chessdiagram ref="cd" ranks={12} files={12}
				fen={"12/12/12/12/12/12/12/12/12/12/12/12 w - - 0 1"}
			/>
		);
		// Aside: `expect(wrapper.find('Square')).toHaveLength(144)` should work, and it doesn't.
		// Not totally sure why expect is returning an object w/o all of the standard Jest matchers
		expect(wrapper.find('Square').length).toBe(144);
	})

});

/***************
* Test GameHistory container
***************/

describe('Testing GameHistory', () => {
  const testPgn = ['[Event "Casual Game"]',
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
   '23.Bd7+ Kf8 24.Bxe7# 1-0'];

  it('should not render by default', () => {
    const wrapper = mount(
      <Chessdiagram ref="cd" />
    );
    expect(wrapper.find('GameHistory').length).toBe(0);
  });

  it('should render if enabled', () => {
    const wrapper = mount(
      <Chessdiagram ref="cd" gameHistory />
    );
    expect(wrapper.find('GameHistory').length).toBe(1);
  });

  it('should render test pgn', () => {
    const wrapper = mount(
      <GameHistory
        pgn={testPgn.join('\n')}
      />
    );
    expect(wrapper.find('.pgn-cell').length).toBe(48);
  });

	describe('Test currentMove when provided with startMove', () => {
		it('should handle string', () => {
			const wrapper = mount(
				<Chessdiagram
					gameHistory
					pgn={testPgn.join('\n')}
					startMove={'b11'}
				/>
			);
			expect(wrapper.state().currentMove).toBe(22)
		});

		it('should handle number', () => {
			const wrapper = mount(
				<Chessdiagram
					gameHistory
					pgn={testPgn.join('\n')}
					startMove={12}
				/>
			);
			expect(wrapper.state().currentMove).toBe(12)
		});

	});

  it('should render with non-standard newlineChar', () => {
    const wrapper = mount(
      <GameHistory
        newlineChar={"\t"}
        pgn={testPgn.join('\t')}
      />
    );
    expect(wrapper.find('.pgn-cell').length).toBe(48);
  });

	it('should handle PGNs with comments', () => {
		const pgn = `[Event "Third Rosenwald Trophy"]
			[Site "New York, NY USA"]
			[Date "1956.10.17"]
			[EventDate "1956.10.07"]
			[Round "8"]
			[Result "0-1"]
			[White "Donald Byrne"]
			[Black "Robert James Fischer"]
			[ECO "D92"]
			[WhiteElo "?"]
			[BlackElo "?"]
			[PlyCount "82"]

			1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. d4 O-O 5. Bf4 d5 6. Qb3 dxc4
			7. Qxc4 c6 8. e4 Nbd7 9. Rd1 Nb6 10. Qc5 Bg4 11. Bg5 {11. Be2
			followed by 12 O-O would have been more prudent. The bishop
			move played allows a sudden crescendo of tactical points to be
			uncovered by Fischer. -- Wade} Na4 {!} 12. Qa3 {On 12. Nxa4
			Nxe4 and White faces considerable difficulties.} Nxc3 {At
			first glance, one might think that this move only helps White
			create a stronger pawn center; however, Fischer's plan is
			quite the opposite. By eliminating the Knight on c3, it
			becomes possible to sacrifice the exchange via Nxe4 and smash
			White's center, while the King remains trapped in the center.}
			13. bxc3 Nxe4 {The natural continuation of Black's plan.}
			14. Bxe7 Qb6 15. Bc4 Nxc3 16. Bc5 Rfe8+ 17. Kf1 Be6 {!! If
			this is the game of the century, then 17...Be6!! must be the
			counter of the century. Fischer offers his queen in exchange
			for a fierce attack with his minor pieces. Declining this
			offer is not so easy: 18. Bxe6 leads to a 'Philidor Mate'
			(smothered mate) with ...Qb5+ 19. Kg1 Ne2+ 20. Kf1 Ng3+
			21. Kg1 Qf1+ 22. Rxf1 Ne2#. Other ways to decline the queen
			also run into trouble: e.g., 18. Qxc3 Qxc5} 18. Bxb6 Bxc4+
			19. Kg1 Ne2+ 20. Kf1 Nxd4+ {This tactical scenario, where a
			king is repeatedly revealed to checks, is sometimes called a
			"windmill."} 21. Kg1 Ne2+ 22. Kf1 Nc3+ 23. Kg1 axb6 24. Qb4
			Ra4 25. Qxb6 Nxd1 26. h3 Rxa2 27. Kh2 Nxf2 28. Re1 Rxe1
			29. Qd8+ Bf8 30. Nxe1 Bd5 31. Nf3 Ne4 32. Qb8 b5 {Every piece
			and pawn of the black camp is defended. The white queen has
			nothing to do.} 33. h4 h5 34. Ne5 Kg7 35. Kg1 Bc5+ 36. Kf1
			Ng3+ {Now Byrne is hopelessly entangled in Fischer's mating
			net.} 37. Ke1 Bb4+ 38. Kd1 Bb3+ 39. Kc1 Ne2+ 40. Kb1 Nc3+
			41. Kc1 Rc2# 0-1`;
			const wrapper = mount(<GameHistory pgn={pgn}/>)
			expect(wrapper.find('.pgn-cell').length).toBe(82);
	});
});

describe('Testing pgn controls', () => {
	const testPgn = [
	'[Event "Hoogovens"]',
	'[Site "Wijk aan Zee NED"]',
	'[Date "1971.01.26"]',
	'[EventDate "?"]',
	'[Round "12"]',
	'[Result "1-0"]',
	'[White "Tigran Vartanovich Petrosian"]',
	'[Black "Hans Ree"]',
	'[ECO "A29"]',
	'[WhiteElo "?"]',
	'[BlackElo "?"]',
	'[PlyCount "15"]',
	'',
	'1. c4 e5 2. Nc3 Nf6 3. Nf3 Nc6 4. g3 Bb4 5. Nd5 Nxd5 6. cxd5',
	'e4 7. dxc6 exf3 8. Qb3 1-0'];
	 const Chess = require('chess.js').Chess;

 	let wrapper = mount(<Chessdiagram ref="cd" gameHistory pgn={testPgn.join('\n')}/>);
 	let firstMove = wrapper.findWhere(n => n.text() === '|<');
 	let reversePgn = wrapper.findWhere(n => n.text() === '<');
 	let advancePgn = wrapper.findWhere(n => n.text() === '>');
 	let lastMove = wrapper.findWhere(n => n.text() === '>|');

	const refreshWrapper = () => {
		wrapper = mount(<Chessdiagram ref="cd" gameHistory pgn={testPgn.join('\n')}/>);
	 	firstMove = wrapper.findWhere(n => n.text() === '|<');
	 	reversePgn = wrapper.findWhere(n => n.text() === '<');
	 	advancePgn = wrapper.findWhere(n => n.text() === '>');
	 	lastMove = wrapper.findWhere(n => n.text() === '>|');
	};

 	let game = new Chess();
 	const fens = [];
 	game.load_pgn(testPgn.join('\n'));
 	while (true) {
 		fens.unshift(game.fen());
 		const result = game.undo();
 		if (!result) {
 			break;
 		}
 	}
	const last = fens.length - 1;

	it('should alter the display of the board', () => {
		refreshWrapper();
		expect(wrapper.find('Piece').length).toBe(32);
		lastMove.simulate('click');
		const pieceCount = wrapper.state().currentPosition.split(' ')[0].match(/[a-zA-Z]/g).length
		expect(wrapper.find('Piece').length).toBe(pieceCount);
	});

	it('should go to last move properly', () => {
		refreshWrapper();
		expect(wrapper.state().currentPosition).toBe(fens[0]);
		lastMove.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[last]);
		/* check to make sure there's not an off by one */
		reversePgn.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[last-1]);
	});

	it('should step forward through moves', () => {
		refreshWrapper();
		expect(wrapper.state().currentPosition).toBe(fens[0]);
		for (let i = 0; i < fens.length - 1; i++) {
			advancePgn.simulate('click');
			expect(wrapper.state().currentPosition).toBe(fens[i + 1]);
		}
	});

	it('should goto first move properly', () => {
		refreshWrapper();
		expect(wrapper.state().currentPosition).toBe(fens[0], 'start move');
		lastMove.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[last]);
		firstMove.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[0]);
		/* Make sure there's not an off-by-one */
		advancePgn.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[1]);
	})

	it('should step backwards through moves', () => {
		refreshWrapper();
		expect(wrapper.state().currentPosition).toBe(fens[0], 'start move');
		lastMove.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[last]);
		for (let i = last; i > 0; i--) {
			reversePgn.simulate('click');
			expect(wrapper.state().currentPosition).toBe(fens[i - 1]);
		}
	});

	it('should tolerate moving off the edge', () => {
		refreshWrapper();
		expect(wrapper.state().currentPosition).toBe(fens[0]);
		reversePgn.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[0]);
		advancePgn.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[1]);
		lastMove.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[last]);
		advancePgn.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[last]);
		reversePgn.simulate('click');
		expect(wrapper.state().currentPosition).toBe(fens[last - 1])
	})
});
