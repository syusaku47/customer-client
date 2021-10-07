import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { CsvActions } from './csv.action';
import {
  CsvBirthdaySort,
  CsvCustomerRankSort,
  CsvCustomerSort,
  CsvLostOrderSort,
  CsvMaintenanceSort,
  CsvNonOrderSort,
  CsvOrderSort,
  CsvProjectSort,
  CsvSupportHistorySort,
  CsvWeddingSort,
} from '../../type/csv/csv-sort.type';
import {
  CsvCustomerListType,
  CsvBirthdayListType,
  CsvWeddingAnniversaryListType,
  CsvProjectListType,
  CsvLostOrderType,
  CsvNotOrderType,
  CsvOrderListType,
  CsvMaintenanceType,
  CsvSupportHistoryType,
  CsvCustomerRankType,
} from '../../type/csv/csv.type';
import { ExportCsvSortCollection } from '../../collection/export-csv/export-csv-sort.collection';

const sort = ExportCsvSortCollection;

export type CsvState = {
  customerList: CsvCustomerListType[];
  customerSort: CsvCustomerSort;
  birthdayList: CsvBirthdayListType[];
  birthdaySort: CsvBirthdaySort;
  weddingList: CsvWeddingAnniversaryListType[];
  weddingSort: CsvWeddingSort;
  projectList: CsvProjectListType[];
  projectSort: CsvProjectSort;
  lostOrderList: CsvLostOrderType[];
  nonOrderList: CsvNotOrderType[];
  orderList: CsvOrderListType[];
  maintenanceList: CsvMaintenanceType[];
  supportHistoryList: CsvSupportHistoryType[];
  customerRankList: CsvCustomerRankType[];
  lostOrderSort: CsvLostOrderSort;
  nonOrderSort: CsvNonOrderSort;
  orderSort: CsvOrderSort;
  maintenanceSort: CsvMaintenanceSort;
  supportHistorySort: CsvSupportHistorySort;
  customerRankSort: CsvCustomerRankSort;
};

const initialState: CsvState = {
  customerList: [],
  birthdayList: [],
  weddingList: [],
  projectList: [],
  lostOrderList: [],
  nonOrderList: [],
  orderList: [],
  maintenanceList: [],
  supportHistoryList: [],
  customerRankList: [],
  customerSort: sort.customer(),
  projectSort: sort.project(),
  weddingSort: sort.wedding(),
  birthdaySort: sort.birthday(),
  lostOrderSort: sort.lostOrder(),
  nonOrderSort: sort.nonOrder(),
  orderSort: sort.order(),
  maintenanceSort: sort.maintenance(),
  supportHistorySort: sort.supportHistory(),
  customerRankSort: sort.customerRank(),
};

export const CsvReducer = reducerWithInitialState<CsvState>(
  initialState,
)
  .case(CsvActions.setCustomerList, (state, payload) => ({
    ...state,
    customerList: lodash.cloneDeep(payload),
  }))
  .case(CsvActions.setBirthdayList, (state, payload) => ({
    ...state,
    birthdayList: lodash.cloneDeep(payload),
  }))
  .case(CsvActions.setWeddingList, (state, payload) => ({
    ...state,
    weddingList: lodash.cloneDeep(payload),
  }))
  .case(CsvActions.setProjectList, (state, payload) => ({
    ...state,
    projectList: lodash.cloneDeep(payload),
  }))
  .case(CsvActions.setLostOrderList, (state, payload) => ({
    ...state,
    lostOrderList: lodash.cloneDeep(payload),
  }))
  .case(CsvActions.setNonOrderList, (state, payload) => ({
    ...state,
    nonOrderList: lodash.cloneDeep(payload),
  }))
  .case(CsvActions.setOrderList, (state, payload) => ({
    ...state,
    orderList: lodash.cloneDeep(payload),
  }))
  .case(CsvActions.setMaintenanceList, (state, payload) => ({
    ...state,
    maintenanceList: lodash.cloneDeep(payload),
  }))
  .case(CsvActions.setSupportHistoryList, (state, payload) => ({
    ...state,
    supportHistoryList: lodash.cloneDeep(payload),
  }))
  .case(CsvActions.setCustomerRankList, (state, payload) => ({
    ...state,
    customerRankList: lodash.cloneDeep(payload),
  }))
  .case(CsvActions.setCustomerSort, (state, payload) => ({
    ...state,
    customerSort: payload ? lodash.cloneDeep({
      ...state.customerSort,
      ...payload,
    }) : sort.customer(),
  }))
  .case(CsvActions.setBirthdaySort, (state, payload) => ({
    ...state,
    birthdaySort: payload ? lodash.cloneDeep({
      ...state.birthdaySort,
      ...payload,
    }) : sort.birthday(),
  }))
  .case(CsvActions.setWeddingSort, (state, payload) => ({
    ...state,
    weddingSort: payload ? lodash.cloneDeep({
      ...state.weddingSort,
      ...payload,
    }) : sort.wedding(),
  }))
  .case(CsvActions.setProjectSort, (state, payload) => ({
    ...state,
    projectSort: payload ? lodash.cloneDeep({
      ...state.projectSort,
      ...payload,
    }) : sort.project(),
  }))
  .case(CsvActions.setLostOrderSort, (state, payload) => ({
    ...state,
    lostOrderSort: payload ? lodash.cloneDeep({
      ...state.lostOrderSort,
      ...payload,
    }) : sort.lostOrder(),
  }))
  .case(CsvActions.setNonOrderSort, (state, payload) => ({
    ...state,
    nonOrderSort: payload ? lodash.cloneDeep({
      ...state.nonOrderSort,
      ...payload,
    }) : sort.nonOrder(),
  }))
  .case(CsvActions.setOrderSort, (state, payload) => ({
    ...state,
    orderSort: payload ? lodash.cloneDeep({
      ...state.orderSort,
      ...payload,
    }) : sort.order(),
  }))
  .case(CsvActions.setMaintenanceSort, (state, payload) => ({
    ...state,
    maintenanceSort: payload ? lodash.cloneDeep({
      ...state.maintenanceSort,
      ...payload,
    }) : sort.maintenance(),
  }))
  .case(CsvActions.setSupportHistorySort, (state, payload) => ({
    ...state,
    supportHistorySort: payload ? lodash.cloneDeep({
      ...state.supportHistorySort,
      ...payload,
    }) : sort.supportHistory(),
  }))
  .case(CsvActions.setCustomerRankSort, (state, payload) => ({
    ...state,
    customerRankSort: payload ? lodash.cloneDeep({
      ...state.customerRankSort,
      ...payload,
    }) : sort.customerRank(),
  }))
  .case(CsvActions.resetState, () => initialState)
  .default((state) => state);
