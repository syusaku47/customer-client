import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { EstimateActions } from './estimate.action';
import { Estimate, EstimateListType, EstimateSortState } from '../../type/estimate/estimate.type';
import { EstimateCollection } from '../../collection/estimate/estimatecollection';
import { EstimateMeisaiSideMenu, EstimateMeisaiListType, EstimateMeisai } from '../../type/estimate/estimate-meisai.type';

export type EstimateState = {
  estimate: Estimate | null;
  list: EstimateListType[];
  sort: EstimateSortState;
  estimateSearchSort: EstimateSortState;
  meisaiSideMenu: EstimateMeisaiSideMenu | null;
  meisaiList: EstimateMeisaiListType[]
  meisai: EstimateMeisai | null
};

const initialState: EstimateState = {
  estimate: null,
  list: [],
  sort: EstimateCollection.sortInitialState,
  estimateSearchSort: EstimateCollection.sortInitialState,
  meisaiSideMenu: null,
  meisaiList: [],
  meisai: null,
};

export const EstimateReducer = reducerWithInitialState<EstimateState>(initialState)
  .case(EstimateActions.setEstimate, (state, payload) => ({
    ...state,
    estimate: lodash.cloneDeep(payload),
  }))
  .case(EstimateActions.setList, (state, payload) => ({
    ...state,
    list: lodash.cloneDeep(payload),
  }))
  .case(EstimateActions.setMeisaiList, (state, payload) => ({
    ...state,
    meisaiList: lodash.cloneDeep(payload),
  }))
  .case(EstimateActions.setMeisai, (state, payload) => ({
    ...state,
    meisai: lodash.cloneDeep(payload),
  }))
  .case(EstimateActions.setSort, (state, payload) => ({
    ...state,
    sort: payload ? lodash.cloneDeep({
      ...state.sort,
      ...payload,
    }) : EstimateCollection.sortInitialState,
  }))
  .case(EstimateActions.setEstimateSearchSort, (state, payload) => ({
    ...state,
    estimateSearchSort: payload ? lodash.cloneDeep({
      ...state.sort,
      ...payload,
    }) : EstimateCollection.sortInitialState,
  }))
  .case(EstimateActions.setMeisaiSideMenu, (state, payload) => ({
    ...state,
    meisaiSideMenu: lodash.cloneDeep(payload),
  }))
  .case(EstimateActions.resetState, () => initialState)
  .default((state) => state);
