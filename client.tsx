import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { hot } from 'react-hot-loader/root';

import { Provider } from 'react-redux';

import store from './store'
import App from './App'
// import Games from './Games'
// import TicTacToe from './TicTacToe'
// import Lotto from './Lotto'
// import RSP from './RSP'
// import GuGuDan from './GuGuDan'

const Hot = hot(App)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.querySelector('#root')
);
