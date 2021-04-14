import React, {useEffect, MouseEvent} from 'react';
import {useSelector} from 'react-redux';
import {fetchUsers, usersSelector, createUser} from './slices/users';

import {useAppDispatch} from './store';
import {User} from './store/user/user';

import './styles.scss';

const Users = () => {
    const dispatch = useAppDispatch();
    const {users, loading, hasErrors} = useSelector(usersSelector);
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const renderUsers = () => {
        return users.map((user: User) => (
            <div key={user.id} className="PostItem">
                <h1>
                    {user.id} -{user.username}
                </h1>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.adress}</p>
            </div>
        ));
    };

    const addPost = (e: MouseEvent) => {
        e.preventDefault();
        const User = {
            id: 1,
            name: 'Nacef',
            username: 'magiko',
            email: 'nacef.otay@esprit.tn',
            phone: '+21629903274',
            website: 'nacefotay.me',
        };
        dispatch(createUser(User));
    };
    if (loading) {
        return (
            <div className="loader-wrapper">
                <div className="loader">Loading...</div>
            </div>
        );
    }
    if (hasErrors) return <p>Unable to get Users.</p>;
    return (
        <main className="Users">
            <h1>Users List</h1>
            <button onClick={(e) => addPost(e)}>Add User</button>
            <br />
            {renderUsers()}
        </main>
    );
};

export default Users;
