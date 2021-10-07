import actionCreatorFactory from 'typescript-fsa';

export * from './api-test-str';
export * from './get';
export * from './post';
export * from './delete';

export const ActionCreator = actionCreatorFactory('test/api/str');

export const apiStr = {
  get: ActionCreator<string>('get'),
  post: ActionCreator<string>('post'),
  delete: ActionCreator<string>('delete'),
};
