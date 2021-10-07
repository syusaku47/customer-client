import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { cloneDeep } from 'lodash';
import { User } from '../../type/auth/user.typs';
import { AuthActions } from './auth.action';

export type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

export const AuthReducer = reducerWithInitialState<AuthState>(initialState)
  .case(AuthActions.setUser, (state, payload) => ({
    ...state,
    user: cloneDeep(payload),
  }))
  .case(AuthActions.resetState, () => initialState)
  .default((state) => state);
