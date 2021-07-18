import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { hot } from 'react-hot-loader/root';

import TicTacToe from './TicTacToe'
// import Lotto from './Lotto'
// import RSP from './RSP'
// import GuGuDan from './GuGuDan'

const Hot = hot(TicTacToe)

ReactDOM.render(
    <Hot />,

    document.querySelector('#root')
);
