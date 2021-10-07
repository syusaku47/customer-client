import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TestActions } from './test.action';

export type TestState = {
  testStr: string;
};

const initialState: TestState = { testStr: '' };

export const TestReducer = reducerWithInitialState<TestState>(
  initialState,
).case(TestActions.setTestStr, (state, payload) => ({
  ...state,
  testStr: payload,
}));
