import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './users';
const rootReducer = combineReducers({
    users: userReducer,
    //  if we need to use more reducers
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
