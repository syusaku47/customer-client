import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { CustomerActions } from './customer.action';
import { CustomerListType, Customer } from '../../type/customer/customer.type';
import { Pet } from '../../type/customer/pet.type';
import { FamilyList } from '../../type/customer/family.type';
import { CustomerSort } from '../../components/sp/layout/search-box/customer/customer-search-box.sp.type';
import { CustomerCollection } from '../../collection/customer/customer.collection';

export type CustomerState = {
  customer: Customer | null;
  list: CustomerListType[];
  listHitCount: number;
  petList: Pet[];
  petListHitCount: number;
  familyList: FamilyList[];
  familyListHitCount: number;
  sort: CustomerSort;
};

const initialState: CustomerState = {
  customer: null,
  list: [],
  listHitCount: 0,
  petList: [],
  petListHitCount: 0,
  familyList: [],
  familyListHitCount: 0,
  sort: CustomerCollection.customerSortInitialState,
};

export const CustomerReducer = reducerWithInitialState<CustomerState>(initialState)
  .case(CustomerActions.setCustomer, (state, payload) => ({
    ...state,
    customer: lodash.cloneDeep(payload),
  }))
  .case(CustomerActions.setList, (state, payload) => ({
    ...state,
    list: lodash.cloneDeep(payload),
  }))
  .case(CustomerActions.setPetList, (state, payload) => ({
    ...state,
    petList: lodash.cloneDeep(payload),
  }))
  .case(CustomerActions.setFamilyList, (state, payload) => ({
    ...state,
    familyList: lodash.cloneDeep(payload),
  }))
  .case(CustomerActions.setListCount, (state, payload) => ({
    ...state,
    listHitCount: lodash.cloneDeep(payload),
  }))
  .case(CustomerActions.setPetListCount, (state, payload) => ({
    ...state,
    petListHitCount: lodash.cloneDeep(payload),
  }))
  .case(CustomerActions.setFamilyListCount, (state, payload) => ({
    ...state,
    familyListHitCount: lodash.cloneDeep(payload),
  }))
  .case(CustomerActions.setSort, (state, payload) => ({
    ...state,
    sort: payload ? lodash.cloneDeep({
      ...state.sort,
      ...payload,
    }) : CustomerCollection.customerSortInitialState,
  }))
  .case(CustomerActions.resetState, () => initialState)
  .default((state) => state);
