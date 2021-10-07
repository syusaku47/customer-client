import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { SupportHistoryListType, SupportHistory, SupportHistorySortState } from '../../type/support-history/support-history.type';
import { SupportHistoryActions } from './support-history.action';
import { SupportHistoryCollection } from '../../collection/support-history/support-history.collection';

export type SupportHistoryState = {
  supportHistory: SupportHistory | null;
  list: SupportHistoryListType[];
  sort: SupportHistorySortState;
};

const initialState: SupportHistoryState = {
  supportHistory: null,
  list: [],
  sort: SupportHistoryCollection.initialSortState(),
};

export const SupportHistoryReducer = reducerWithInitialState<SupportHistoryState>(initialState)
  .case(SupportHistoryActions.setSupportHistory, (state, payload) => ({
    ...state,
    supportHistory: lodash.cloneDeep(payload),
  }))
  .case(SupportHistoryActions.setList, (state, payload) => ({
    ...state,
    list: lodash.cloneDeep(payload),
  }))
  .case(SupportHistoryActions.setSort, (state, payload) => ({
    ...state,
    sort: payload ? lodash.cloneDeep({
      ...state.sort,
      ...payload,
    }) : SupportHistoryCollection.initialSortState(),
  }))
  .case(SupportHistoryActions.resetState, () => initialState)
  .default((state) => state);
