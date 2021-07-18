import { addPost } from './post';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' as const
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' as const
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' as const
export const LOG_OUT = 'LOG_OUT' as const

export interface LogInRequestAction {
    type: typeof LOG_IN_REQUEST,
    data: { id: string, password: string }
}

export interface LogInSuccessAction {
    type: typeof LOG_IN_SUCCESS,
    data: { userId: string, nickname: string }
}

export interface LogInFailureAction {
    type: typeof LOG_IN_FAILURE,
    error: Error
}

export interface LogOutAction {
    type: typeof LOG_OUT
}

export interface ThunkDispatch {
    (thunkAction: ThunkAction): void,
    <A>(action: A): A,
    <TAction>(action: TAction | ThunkAction): TAction;
}

type ThunkAction = (dispatch: ThunkDispatch) => void;


// createContext
// middle ware 

export const logInRequest = (data: { id: string, password: string }): LogInRequestAction => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
}

export interface LogInSuccessAction {
    type: typeof LOG_IN_SUCCESS,
    data: { userId: string, nickname: string }
}

export const logInSuccess = (data: { userId: string, nickname: string }): LogInSuccessAction => {
    return {
        type: LOG_IN_SUCCESS,
        data,
    }
}

export interface LogInFailureAction {
    type: typeof LOG_IN_FAILURE,
    error: Error
}

export const logInFailure = (error: Error): LogInFailureAction => {
    return {
        type: LOG_IN_FAILURE,
        error
    }

}


// 하나의 action에서 여러개의 dispatch를 하고 싶을때 Thunk를 한다?
export const logIn = (data: { id: string, password: string }): ThunkAction => {
    return (dispatch) => {
        dispatch(logInRequest(data));
        setTimeout(() => {
            dispatch(logInSuccess({
                userId: '1',
                nickname: 'zerocho'
            }));

            dispatch(addPost(''));
        })
    }

}

// action return
export const logOut = () => {
    return {
        type: LOG_OUT
    }
}