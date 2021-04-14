import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../store/user/user';
import {RootState} from '.';
import {AppDispatch, AppThunk} from '../store';

export type UsersState = {
    loading: boolean;
    hasErrors: boolean;
    users: User[];
};
//
export const initialState: UsersState = {
    loading: false,
    hasErrors: false,
    users: [],
};
// A slice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.unshift(action.payload);
        },
        startLoading: (state) => {
            state.loading = true;
        },
        getUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getUsersFailure: (state) => {
            state.loading = false;
            //handling Errors
            state.hasErrors = true;
        },
    },
});

// Actions generated from the slice
const {
    addUser,
    startLoading,
    getUsersFailure,
    getUsersSuccess,
} = usersSlice.actions;

// export user selector to get the slice in any component
export const usersSelector = (state: RootState) => state.users;
// export The reducer
const userReducer = usersSlice.reducer;
export default userReducer;
// Actions
export const fetchUsers = (): AppThunk => async (dispatch: AppDispatch) => {
    try {
        dispatch(startLoading());
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users',
        );
        const data: User[] = await response.json();
        dispatch(getUsersSuccess(data));
    } catch (error) {
        dispatch(getUsersFailure());
    }
};

export const createUser = (User: User): AppThunk => async (
    dispatch: AppDispatch,
) => {
    try {
        dispatch(addUser(User));
    } catch (error) {
        dispatch(getUsersFailure());
    }
};
