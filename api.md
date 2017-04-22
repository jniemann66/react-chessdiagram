`Chessdiagram` (component)
==========================

Chessdiagram : draws a chess diagram consisting of a board and pieces, using svg graphics

Props
-----

### `allowMoves`

Whether to allow the user to make moves on the board (ie, whether to ignore mouse input)

type: `bool`
defaultValue: `true`


### `darkSquareColor`

type: `string`
defaultValue: `"#005EBB"`


### `fen`

Fen string to render. Should override

type: `union(string|array)`


### `files`

type: `number`
defaultValue: `8`


### `flip`

if true, rotates the board so that Black pawns are moving up, and White pawns are moving down the board

type: `bool`
defaultValue: `false`


### `gameHistory`

whether to render a GameHistory component

type: `bool`
defaultValue: `false`


### `getFensFromPgn`

Optional custom callbacks for PGN parsing. should take pgn (string).

type: `func`
defaultValue: `(pgn) => {
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
}`


### `getHeader`

type: `func`


### `getMovetext`

type: `func`


### `getResult`

type: `func`


### `getRows`

Returns an array of arrays, containing [<fullmoveNumber>, <whiteMove> <optionalBlackMove>]

type: `func`


### `height`

height of main svg container in pixels. If setting this manually, it should be at least 9 * squareSize to fit board AND labels

type: `union(string|number)`
defaultValue: `'auto'`


### `lightSquareColor`

type: `string`
defaultValue: `"#2492FF"`


### `newlineChar`

Pgn line separator. Defaults to '\r?\n'

type: `string`
defaultValue: `'\r?\n'`


### `onMovePiece`

callback function which is called when user moves a piece. Passes pieceType, initialSquare, finalSquare as parameters to callback

type: `func`


### `onSelectSquare`

callback function which is called when user clicks on a square. Passes name of square as parameter to callback

type: `func`


### `pgn`

String representation of a PGN. Note that chess.js can't handle templates,
so if you'd like to pass templates you'll need a custom getNthMove callback.

type: `string`


### `pgnHeight`

Height of pgn viewer component

type: `number`
defaultValue: `400`


### `pieceDefinitions`

Optional associative array containing non-standard chess characters

type: `object`
defaultValue: `{}`


### `pieces`

array of pieces at particular squares (alternative to fen) eg ['P@f2','P@g2','P@h2','K@g1'].
This format may be more suitable for unconventional board dimensions, for which standard FEN would not work.
Note: If both FEN and pieces props are present, FEN will take precedence

type: `array`


### `ranks`

type: `number`
defaultValue: `8`


### `squareSize`

size of the squares in pixels

type: `number`
defaultValue: `45`


### `startMove`

type: `union(string|number)`
defaultValue: `0`


### `startPosition`

Chess position in FEN format (Forsyth-Edwards Notation). eg "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

type: `string`


### `width`

width of main svg container in pixels. If setting this manually, it should be at least 9 * squareSize to fit board AND labels

type: `union(string|number)`
defaultValue: `'auto'`


`Board` (component)
===================

Board : draws a chess board with given square size, square colors, and number of files and ranks

Props
-----

### `darkSquareColor` (required)

type: `string`
defaultValue: `"#005EBB"`


### `files` (required)

type: `number`
defaultValue: `8`


### `flip` (required)

type: `bool`
defaultValue: `false`


### `highlights`

type: `object`
defaultValue: `{}`


### `lightSquareColor` (required)

type: `string`
defaultValue: `"#2492FF"`


### `ranks` (required)

type: `number`
defaultValue: `8`


### `selectedSquare`

type: `string`


### `squareSize` (required)

type: `number`
defaultValue: `45`


`Piece` (component)
===================

Piece: renders an svg chess piece of a given type and position

Props
-----

### `drawPiece` (required)

type: `func`


### `pieceType` (required)

type: `string`


### `squareSize` (required)

type: `number`


### `x` (required)

type: `number`


### `y` (required)

type: `number`


