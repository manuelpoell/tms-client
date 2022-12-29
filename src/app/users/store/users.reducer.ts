import { createFeature, createReducer, on } from '@ngrx/store';
import { addUserSuccess, deleteUserSuccess, loadUserListSuccess, loadUserSuccess, resetUserList, updateUserSuccess } from './users.actions';
import { UsersState } from './users.state';
import { unionWith } from 'lodash-es';

export const initialState: UsersState = {
  users: [],
  totalCount: 0,
  filterCount: 0,
};

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(loadUserListSuccess, (state, { users, totalCount, filterCount }): UsersState => ({ ...state, totalCount, filterCount, users: unionWith(state.users, users, (a, b) => a.id === b.id) })),
    on(loadUserSuccess, (state, { user }): UsersState => ({ ...state, users: unionWith(state.users, [user], (a, b) => a.id === b.id) })),
    on(addUserSuccess, (state, { user }): UsersState => ({ ...state, users: unionWith(state.users, [user], (a, b) => a.id === b.id) })),
    on(updateUserSuccess, (state, { user }): UsersState => ({ ...state, users: state.users.map((u) => u.id === user.id ? { ...user } : u) })),
    on(deleteUserSuccess, (state, { userId }) => ({ ...state, users: state.users.filter((user) => user.id !== userId) })),
    on(resetUserList, (): UsersState => ({ ...initialState })),
  ),
});
