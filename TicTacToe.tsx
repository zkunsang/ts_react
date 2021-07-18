import * as React from 'react';
import { useEffect, useCallback, useReducer, Reducer } from 'react';

import Table from './Table';

interface ReducerState {
    winner: 'O' | 'X' | '',
    turn: 'O' | 'X',
    tableData: string[][],
    recentCell: [number, number]
}

const initialState: ReducerState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1]
}

// useReduce 
// 스테이트를 변경하는 액션!
export const SET_WINNER = 'SET_WINNER' as const;
export const CLICK_CELL = 'CLICK_CELL' as const;
export const CHANGE_TURN = 'CHANGE_TURN' as const;
export const RESET_GAME = 'RESET_GAME' as const;


// 액션들 타이핑을 다 해줘야 한다.
interface SetWinnerAction {
    type: typeof SET_WINNER;
    winner: 'O' | 'X'
}

// 타입 스크립트에서  아래와 같은 안전성을 보장해 줄 수 있기 때문에 
// 사용해야 한다.
// const setWinnter = (winner: 'O' | 'X'): SetWinnerAction => {
//     return { type: SET_WINNER, winner }
// }

// actionCreater
const setWinner = (winner: 'O' | 'X'): SetWinnerAction => {
    return { type: SET_WINNER, winner }
}

interface ClickCellAction {
    type: typeof CLICK_CELL,
    row: number;
    cell: number;
}

const clickCell = (row: number, cell: number): ClickCellAction => {
    return { type: CLICK_CELL, row, cell }
}

// 변하는 값이 없음
// 변하는 변수가 있으면
interface ChangeTurnAction {
    type: typeof CHANGE_TURN;
}

interface ResetGameAction {
    type: typeof RESET_GAME;
}


// useReducer 
// redux를 간단히 만들어 놓은것
// 

// 리듀서란 상태와 액션을 받고 상태를 뱉어내는 함수
// 이전 스테이터스를 새로운 스테이터스를 만드는 함수
type ReducerActions = SetWinnerAction | ClickCellAction | ChangeTurnAction | ResetGameAction
const reducer = (state: ReducerState, action: ReducerActions): ReducerState => {
    switch (action.type) {
        case SET_WINNER: {
            return {
                ...state,
                winner: action.winner
            }
        }
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];// immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn;

            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell]
            }
        }

        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O'
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell: [-1, -1]
            }
        }
        default:
            return state;

    }
}

// 현재는 이 dispatch를 줄줄이 프롭스로 던지지만
// mobx?를 이용해서 context api를 이용해서 처리
const TicTacToe = () => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const [state, dispatch] = useReducer<React.Reducer<ReducerState, ReducerActions>>(reducer, initialState);
    const { tableData, winner, turn, recentCell } = state;

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        console.log(win, row, cell, tableData, turn);
        if (win) { // 승리시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            let all = true; // all이 true면 무승부라는 뜻
            tableData.forEach((row) => { // 무승부 검사
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);

    const onClickTable = useCallback(() => {
        dispatch(setWinner('O'));
    }, []);

    return (
        <>
            {/* <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리</div>} */}
        </>
    )
}

export default TicTacToe;