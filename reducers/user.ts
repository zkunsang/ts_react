
import produce from 'immer';
import { LOG_IN_FAILURE, LOG_IN_SUCCESS, LOG_IN_REQUEST, LOG_OUT, LogInFailureAction, LogInRequestAction, LogInSuccessAction, LogOutAction } from '../actions/user';

export interface UserState {
    isLogIn: boolean,
    data: {
        nickname: string,
    } | null
}

const initialState: UserState = {
    isLogIn: false,
    data: null
};
type UserReducerActions = LogInFailureAction | LogInRequestAction | LogInSuccessAction | LogOutAction;

const userReducer = (prevState: UserState = initialState, action: UserReducerActions) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.data = null;
                draft.isLogIn = true;
                break;
            case LOG_IN_SUCCESS:
                draft.data = action.data;
                draft.isLogIn = false;
                break;
            case LOG_IN_FAILURE:
                draft.data = null;
                draft.isLogIn = false;
            case LOG_OUT:
                draft.data = null;
                break;
            default:
                break;
        }
    })

}

export default userReducer;