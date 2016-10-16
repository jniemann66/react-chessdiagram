`Chessdiagram` (component)
==========================

Chessdiagram : draws a chess diagram consisting of a board and pieces, using svg graphics

Props
-----

### `darkSquareColor`

type: `string`
defaultValue: `"#005EBB"`


### `files`

type: `number`
defaultValue: `8`


### `flip`

if true, rotates the board so that Black pawns are moving up, and White pawns are moving down the board

type: `bool`
defaultValue: `false`


### `height`

height of main svg container in pixels. If setting this manually, it should be at least 9 * squareSize to fit board AND labels

type: `union(string|number)`
defaultValue: `'auto'`


### `lightSquareColor`

type: `string`
defaultValue: `"#2492FF"`


### `onMovePiece`

callback function which is called when user moves a piece. Passes pieceType, initialSquare, finalSquare as parameters to callback

type: `func`


### `ranks`

type: `number`
defaultValue: `8`


### `squareSize`

type: `number`
defaultValue: `45`


### `width`

width of main svg container in pixels. If setting this manually, it should be at least 9 * squareSize to fit board AND labels

type: `union(string|number)`
defaultValue: `'auto'`


`Piece` (component)
===================

Piece: renders an svg chess piece of a given type and position

Props
-----

### `pieceType` (required)

recognized piece types: K,Q,R,B,N,P,k,q,r,b,n,p

type: `string`


### `x` (required)

type: `number`


### `y` (required)

type: `number`


`Board` (component)
===================

Board : draws a chess board with given square size, square colors, and number of files and ranks

Props
-----

### `darkSquareColor`

type: `string`
defaultValue: `"#005EBB"`


### `files`

type: `number`
defaultValue: `8`


### `flip`

type: `bool`
defaultValue: `false`


### `lightSquareColor`

type: `string`
defaultValue: `"#2492FF"`


### `ranks`

type: `number`
defaultValue: `8`


### `squareSize`

type: `number`
defaultValue: `45`


