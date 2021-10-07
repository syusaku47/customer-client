import actionCreatorFactory from 'typescript-fsa';
import { apiStr } from './api/str/index';

export const ActionCreator = actionCreatorFactory('test');

export const TestActions = {
  api: {
    str: apiStr,
  },
  testAlert: ActionCreator<string>('test/alert'),
  setTestStr: ActionCreator<string>('set/test'),
};
