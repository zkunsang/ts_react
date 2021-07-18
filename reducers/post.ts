import produce from 'immer';
import { ADD_POST, AddPostAction } from '../actions/post';

const initialState: string[] = [];

const postReducer = (prevState = initialState, action: AddPostAction): string[] => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case ADD_POST:
                draft.push(action.data);
                break;
            default:
                break;
        }
    })
    switch (action.type) {
        case ADD_POST:
            return [...prevState, action.data];
        default:
            return prevState;
    }
}

export default postReducer;