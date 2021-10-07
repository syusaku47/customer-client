import actionCreatorFactory from 'typescript-fsa';
import { Bill, BillListType, BillSortState } from '../../type/bill/bill.type';
import { apiBill } from './api/bill/api-bill';

const ActionCreator = actionCreatorFactory('bill');

export const BillActions = {
  api: {
    bill: apiBill,
  },
  setBill: ActionCreator<Bill | null>('set/bill'),
  setList: ActionCreator<BillListType[]>('set/list'),
  setSort: ActionCreator<BillSortState | null>('set/sort'),
  resetState: ActionCreator('reset/state'),
};
