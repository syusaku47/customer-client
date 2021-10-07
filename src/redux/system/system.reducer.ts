import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { SystemActions } from './system.action';

export type SystemState = {
  isLoading: boolean;
  isLoadingCount: number;
};

const initialState: SystemState = {
  isLoading: false,
  isLoadingCount: 0,
};

export const SystemReducer = reducerWithInitialState<SystemState>(initialState)
  .case(SystemActions.setIsLoading, (state, payload) => ({
    ...state,
    isLoading: payload,
  }))
  .case(SystemActions.setIsLoadingCount, (state, payload) => {
    const count = state.isLoadingCount + payload;
    return ({
      ...state,
      isLoadingCount: count < 0 ? 0 : count,
    });
  })
  .case(SystemActions.resetState, () => initialState);
