import actionCreatorFactory from 'typescript-fsa';
import { User } from '../../type/auth/user.typs';
import { ApiLoginParam } from './api/login/login';
import { apiPassword } from './api/password/api-password';

export const ActionCreator = actionCreatorFactory('auth');

export const AuthActions = {
  api: {
    login: ActionCreator<{ param: ApiLoginParam; onError:(str: string[]) => void; }>('login'),
    logout: ActionCreator('logout'),
    user: ActionCreator('user'),
    password: apiPassword,
    isLogin: ActionCreator('is/login'),
  },
  setUser: ActionCreator<User | null>('set/user'),
  resetState: ActionCreator('reset/state'),
};
