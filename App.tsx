import * as React from 'react';
import { Component, FC } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { logIn, logOut, ThunkDispatch } from './actions/user';
import { RootState } from './reducers';
import { UserState } from './reducers/user';


// import {context} 

const App: FC = () => {
    const { isLogIn, data } = useSelector<RootState, UserState>((state) => state.user);
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(logIn({
            id: 'zerocho',
            password: '비밀번호'
        }))
    }

    const onLogOut = () => {
        dispatch(logOut);
    }

    return (
        <div>
            {isLogIn
                ? <div>로그인 중</div> : data
                    ? <div>{data.nickname}</div> : '로그인 해주세요'}
            {!data
                ? <button onClick={onClick}>로그인</button>
                : <button onClick={onLogOut}>로그아웃</button>}
        </div>
    )
}

export default App;