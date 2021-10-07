import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { Bill, BillListType, BillSortState } from '../../type/bill/bill.type';
import { BillActions } from './bill.action';
import { BillCollection } from '../../collection/bill/bill.collection';

export type BillState = {
  bill: Bill;
  list: BillListType[];
  sort: BillSortState
};

const initialState: BillState = {
  bill: BillCollection.getInitialState(),
  list: [],
  sort: BillCollection.sortInitialState(),
};

export const BillReducer = reducerWithInitialState<BillState>(initialState)
  .case(BillActions.setBill, (state, payload) => ({
    ...state,
    bill: payload ? lodash.cloneDeep({
      ...state.bill,
      ...payload,
    }) : BillCollection.getInitialState(),
  }))
  .case(BillActions.setList, (state, payload) => ({
    ...state,
    list: lodash.cloneDeep(payload),
  }))
  .case(BillActions.setSort, (state, payload) => ({
    ...state,
    sort: payload ? lodash.cloneDeep({
      ...state.sort,
      ...payload,
    }) : BillCollection.sortInitialState(),
  }))
  .case(BillActions.resetState, () => initialState)
  .default((state) => state);
