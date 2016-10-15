# react-chessdiagram
Chess Diagram React Component

![screenshot](./screenshot.PNG)

A react component that can display chess positions from FEN strings or a form of algebraic notation (P@a5 R@h8 etc)

It is almost entirely stateless. (some state is maintained to keep track of mouse / touch events.)

A callback facility is provided to report dragged pieces back to the host application.

#### sample usage

    import Chessdiagram from '../src/chessdiagram.js';
	
	...

	render() {
		<div>
			<Chessdiagram flip={this.state.flip} fen={this.state.currentPosition} squareSize={30} 
			lightSquareColor={this.state.lightSquareColor} darkSquareColor={this.state.darkSquareColor} onMovePiece={this._onMovePiece.bind(this)}/>
		</div>
	}
	


#### build commands:

dev: **npm run dev** - (output to ./build/dev.chessdiagram.js and served on http://localhost:8080 by dev server)

dist: **npm run build** - (output to ./build/dist.chessdiagram.js)


####to-do: 

docs / auto-docs
unit tests
publish to npm
add a prop for optionally hiding labels etc.
show side to move, castling rights and other info
show arrows etc
handle remaining 5 FEN fields etc
more piece types


####recently completed:

webpack setup for distributing as component with demo.



