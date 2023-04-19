import { combineReducers } from "redux";
import {accountReducer} from './accountReducer';
import {userReducer} from './userReducer';
import {othersReducer} from './othersReducer';

export const appReducer = combineReducers({
    accountReducer,
    userReducer,
    othersReducer
});


export const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}