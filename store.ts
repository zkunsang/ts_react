import { AnyAction, applyMiddleware, compose, createStore, Dispatch, MiddlewareAPI } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

const initialState = {
    user: {
        isLogIn: false,
        data: null,
    },
    posts: [],
}


const firstMiddleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    console.log('loggin', action);
    next(action);
}

// thunk를 굳이 설치 하지 않아도 된다.
// 
const thunkMiddleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (typeof action === 'function') {
        // 비동기
        return action(store.dispatch, store.getState);
    }

    return next(action);//동기
}

const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(firstMiddleware, thunkMiddleware))
    : composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware))

const store = createStore(reducer, initialState, enhancer);

export default store;