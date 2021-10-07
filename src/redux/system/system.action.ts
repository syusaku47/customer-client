import actionCreatorFactory from 'typescript-fsa';
import { ResultType } from '../../type/api.type';

const ActionCreator = actionCreatorFactory('system');

export const SystemActions = {
  pressKey: ActionCreator<string>('press/key'),
  isLoading: ActionCreator<boolean>('is/loading'),
  setIsLoading: ActionCreator<boolean>('set/is/loading'),
  setIsLoadingCount: ActionCreator<number>('set/is/loading/count'),
  authError: ActionCreator<any>('auth/error'),
  allReset: ActionCreator('all/reset'),
  resetState: ActionCreator('reset/state'),
  errorHandle: ActionCreator<{ result: ResultType, title: string; }>('error/handle'),
  connectionError: ActionCreator('connection/error'),
};
