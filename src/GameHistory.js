import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';


class MovetextViewer extends Component {
	shouldComponentUpdate(nextProps) {
		if (this.props.rows.length !== nextProps.rows.length ||
        this.props.halfMove !== nextProps.halfMove) {
			return true;
		}
		return false;
	}

	componentDidMount() {
		this._scrollToActiveMove();
	}

	componentDidUpdate() {
		this._scrollToActiveMove();
	}

	_scrollToActiveMove() {
		if (this.activeMove)
			this.pgnContainer.scrollTop = this.activeMove.offsetTop;
		else
      this.pgnContainer.scrollTop = 0;
	}

	render () {
    // return a fn that renders a cell w/ appropriate highlighting, 1 for white 2 for black
		const renderCell = (color) => {
			return ({value, row}) => {
				const cellMove = (row[0]-1)*2 + color;
				const backgroundColor = cellMove === this.props.halfMove ? 'yellow' : '#FFF';
				return (
          <span
            className={'pgn-cell'}
            onClick={() => this.props.moveHead(cellMove)}
            ref={(cell) => {if (cellMove === this.props.halfMove){this.activeMove = cell;}}}
            style={{backgroundColor}}
          >
            {value}
          </span>
				);
			};
		};
		const columnDefaults = {
			sortable: false
		};
		const columns = [{
			accessor: '0',
			id: 'move',
			width: 40
		},{
			accessor: '1',
			id: 'white',
			width: 90,
			render: renderCell(1)
		}, {
			accessor: '2',
			id: 'black',
			width: 90,
			render: renderCell(2)
		}].map(column => Object.assign({}, columnDefaults, column));
		return (
      <div
        ref={(pgnContainer) => {this.pgnContainer = pgnContainer;}}
        style={{height: 200, overflowY: 'scroll'}}
      >
        <ReactTable
          data={this.props.rows}
          columns={columns}
          showPagination={false}
          pageSize={this.props.rows.length}
        />
      </div>
		);
	}
}

MovetextViewer.propTypes = {
	rows: PropTypes.array,
	halfMove: PropTypes.number,
	moveHead: PropTypes.func
};

class PgnControls extends Component {
	render() {
		return (
      <div>
        <button value={-Infinity} onClick={this.props.moveHead}>{"|<"}</button>
        <button value={-1} onClick={this.props.moveHead}>{"<"}</button>
        <button value={1} onClick={this.props.moveHead}>{">"}</button>
        <button value={Infinity} onClick={this.props.moveHead}>{">|"}</button>
      </div>
		);
	}
}

PgnControls.propTypes = {
	moveHead: PropTypes.func.isRequired
};

class GameHistory extends Component {

	constructor(props) {
		super(props);
		const movetext = props.getMovetext(props.pgn, props.newlineChar);
		const rows = props.getRows(movetext, props.newlineChar);
		const maxMove = props.pgn ? (rows.length - 1) * 2 + (rows[rows.length - 1].length - 1) : 0;
		this.state = {
			header: props.getHeader(props.pgn, props.newlineChar),
			movetext,
			maxMove: maxMove,
			rows
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.pgn !== this.props.pgn) {
			const movetext = nextProps.getMovetext(nextProps.pgn, nextProps.newlineChar);
			const rows = nextProps.getRows(movetext, nextProps.newlineChar);
			const maxMove = nextProps.pgn ? (rows.length - 1) * 2 + (rows[rows.length - 1].length - 1) : 0;
			this.setState({
				header: nextProps.getHeader(nextProps.pgn, nextProps.newlineChar),
				maxMove,
				movetext,
				rows
			});
		}
	}

	_onMovePgnHead(evt) {
		const limit = Number(evt.target.value);
		let currentHalfMove = this.props.currentMove;
		const direction = limit > 0 ? 1 : -1;
		let target;
		if (direction === 1) {
			target = Math.min(currentHalfMove + limit, this.state.maxMove);
		} else {
			target = Math.max(currentHalfMove + limit, 0); // Limit will be negative
		}
		this.props.moveHead(target);

	}

	render () {
		return (
      <div style={{display: 'inline-block', position: 'absolute', marginLeft: 5}}>
        <MovetextViewer
          halfMove={this.props.currentMove}
          moveHead={this.props.moveHead}
          pgnHeight={this.props.pgnHeight}
          pgnWidth={this.props.pgnWidth}
          rows={this.props.getRows(this.props.getMovetext(this.props.pgn, this.props.newlineChar), this.props.newlineChar)}
        />
        <PgnControls moveHead={this._onMovePgnHead.bind(this)}/>
      </div>
		);
	}
}

GameHistory.propTypes = {
	currentMove: PropTypes.number,
	getHeader: PropTypes.func,
	getMovetext: PropTypes.func,
	getResult: PropTypes.func,
	getRows: PropTypes.func,
	moveHead: PropTypes.func,
	newlineChar: PropTypes.string.isRequired,
	pgn: PropTypes.string,
	pgnHeight: PropTypes.number,
	pgnWidth: PropTypes.number,
	sloppy: PropTypes.bool
};

const defaultGetHeader = (pgn, newlineChar) => {
	const headerRegex = new RegExp('^(' + newlineChar + '|.)*' +
																	'(?:' + newlineChar + '){2}');
	const result = headerRegex.exec(pgn);
	return result ? result[0] : '';
};

const defaultGetMovetext = (pgn, newlineChar) => {
	const movetextRegex = new RegExp('(?:' + newlineChar + '){2}' +
																		'(' + newlineChar + '|.)*$');
	const result = movetextRegex.exec(pgn);
	return result ? result[0] : '';
};

const defaultGetRows = (movetext, newlineChar) => { // eslint-diable-line no-unused-vars
	newlineChar;
	let ms = movetext;
	// console.log('movetext ==', movetext);
	if (!ms) {
		return [];
	}
	/* delete comments */
	ms = ms.replace(/(\{[^}]+\})+?/g, '');

	/* delete recursive annotation variations */
	const ravRegex = /(\([^\(\)]+\))+?/g;
	while (ravRegex.test(ms)) {
		ms = ms.replace(ravRegex, '');
	}

	/* delete numeric annotation glyphs */
	ms = ms.replace(/\$\d+/g, '');

	/* Delete result */
	ms = ms.replace(/(?:1-0|0-1|1\/2-1\/2|\*)$/, '');

	/* Delete any double spaces */
	ms = ms.replace(/\s\s/g, ' ').trim();

	/* Split into rows */
	const rows = [];
	const rowRegex = /\d+\.\s?\S+(?:\s+\S+)?/g;
	while (true) {
		const result = rowRegex.exec(ms);
		if (!result) {break;}
		const row = result[0].split(/\s|\.\s?/g);
		row[0] = parseInt(row[0]);
		rows.push(row);
	}
	return rows;
};

const defaultGetResult = (pgn, newlineChar) => { // eslint-diable-line no-unused-vars
	newlineChar;
	/* Return the game termination marker, which will be one of:
  *  	1-0 | 0-1 | 1/2-1/2 | *
  */
	const regex = new RegExp(/(?:1-0|0-1|1\/2-1\/2|\*)$/);
	return pgn.match(regex)[0];
};

GameHistory.defaultProps = {
	getHeader: defaultGetHeader,
	getMovetext: defaultGetMovetext,
	getResult: defaultGetResult,
	getRows: defaultGetRows,
	newlineChar: '\r?\n',
	sloppy: false
};

export default GameHistory;
