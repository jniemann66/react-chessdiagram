import React from 'react';
//import renderer from 'react-test-renderer';
import Chessdiagram from '../src/chessdiagram';

console.log('booyah');

import ReactDOM from 'react-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chessdiagram />, div);
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