import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { hot } from 'react-hot-loader/root';

import Lotto from './Lotto'
// import RSP from './RSP'
// import GuGuDan from './GuGuDan'

const Hot = hot(Lotto)

ReactDOM.render(
    <Hot />,

    document.querySelector('#root')
);
