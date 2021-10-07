import actionCreatorFactory from 'typescript-fsa';
import { apiCsvCustomerRank } from './api/customer-rank/api-customer-rank';
import { apiCsvMaintenance } from './api/maintenance/api-csv-maintenance';
import { apiCsvOrder } from './api/order/api-csv-order';
import { apiCsvNonOrder } from './api/non-order/api-csv-non-order';
import { apiCsvProject } from './api/project/api-csv-project';
import { apiCsvWedding } from './api/wedding/api-csv-wedding';
import { apiCsvBirthday } from './api/birhday/api-csv-birthday';
import { apiCsvCustomer } from './api/customer/api-csv-customer';
import { apiCsvLostOrder } from './api/lost-order/api-csv-lost-order';
import { apiCsvSupportHistory } from './api/support-history/api-csv-support-history';
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

const ActionCreator = actionCreatorFactory('project');

export const CsvActions = {
  api: {
    customer: apiCsvCustomer,
    birthday: apiCsvBirthday,
    wedding: apiCsvWedding,
    project: apiCsvProject,
    lostOrder: apiCsvLostOrder,
    nonOrder: apiCsvNonOrder,
    order: apiCsvOrder,
    maintenance: apiCsvMaintenance,
    supportHistory: apiCsvSupportHistory,
    customerRank: apiCsvCustomerRank,
  },
  setCustomerSort: ActionCreator<CsvCustomerSort | null>('set/customer/sort'),
  setCustomerList: ActionCreator<CsvCustomerListType[]>('set/customer/list'),
  setBirthdayList: ActionCreator<CsvBirthdayListType[]>('set/birthday/list'),
  setBirthdaySort: ActionCreator<CsvBirthdaySort | null>('set/birthday/sort'),
  setWeddingList: ActionCreator<CsvWeddingAnniversaryListType[]>(
    'set/wedding/list',
  ),
  setWeddingSort: ActionCreator<CsvWeddingSort | null>('set/wedding/sort'),
  setProjectList: ActionCreator<CsvProjectListType[]>('set/project/list'),
  setProjectSort: ActionCreator<CsvProjectSort | null>('set/project/sort'),
  setLostOrderList: ActionCreator<CsvLostOrderType[]>('set/lost/order/list'),
  setLostOrderSort: ActionCreator<CsvLostOrderSort | null>('set/lost/order/sort'),
  setNonOrderList: ActionCreator<CsvNotOrderType[]>('set/non/order/list'),
  setNonOrderSort: ActionCreator<CsvNonOrderSort | null>('set/non/order/sort'),
  setOrderList: ActionCreator<CsvOrderListType[]>('set/order/list'),
  setOrderSort: ActionCreator<CsvOrderSort | null>('set/order/sort'),
  setMaintenanceList: ActionCreator<CsvMaintenanceType[]>(
    'set/maintenance/list',
  ),
  setMaintenanceSort: ActionCreator<CsvMaintenanceSort | null>('set/maintenance/sort'),
  setSupportHistoryList: ActionCreator<CsvSupportHistoryType[]>(
    'set/support/history/list',
  ),
  setSupportHistorySort: ActionCreator<CsvSupportHistorySort | null>('set/support/history/sort'),
  setCustomerRankList: ActionCreator<CsvCustomerRankType[]>(
    'set/customer/rank/list',
  ),
  setCustomerRankSort: ActionCreator<CsvCustomerRankSort | null>('set/customer/rank/sort'),
  resetState: ActionCreator('reset/state'),
};
