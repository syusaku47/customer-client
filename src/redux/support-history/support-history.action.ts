import actionCreatorFactory from 'typescript-fsa';
import { SupportHistory, SupportHistorySortState, SupportHistoryListType } from '../../type/support-history/support-history.type';
import { apiSupportHistory } from './api/api-support-history/api-support-history';

const ActionCreator = actionCreatorFactory('support/history');

export const SupportHistoryActions = {
  api: {
    supportHistory: apiSupportHistory,
  },
  setSupportHistory: ActionCreator<SupportHistory | null>('set/support-history'),
  setList: ActionCreator<SupportHistoryListType[]>('set/list'),
  setSort: ActionCreator<SupportHistorySortState |null>('set/sort'),
  resetState: ActionCreator('reset/state'),
};
