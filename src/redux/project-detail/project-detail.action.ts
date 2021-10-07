// import {ApiLogin} from '../../api/auth/api-login';
import actionCreatorFactory from 'typescript-fsa';
import { FileSortState, FileListType } from '../../type/file/file.type';
import { SupportHistorySortState, SupportHistoryListType } from '../../type/support-history/support-history.type';
import { MaintenanceSortState, MaintenanceList } from '../../type/maintenance/maintenance.type';
import { EstimateListType, EstimateSortState } from '../../type/estimate/estimate.type';
import { BillListType, BillSortState } from '../../type/bill/bill.type';

const ActionCreator = actionCreatorFactory('project/detail');

export const ProjectDetailActions = {
  setEstimateSort: ActionCreator<EstimateSortState | null>('set/estimate/sort'),
  setBillSort: ActionCreator<BillSortState | null>('set/bill/sort'),
  setFileSort: ActionCreator<FileSortState | null>('set/file/sort'),
  setSupportSort: ActionCreator<SupportHistorySortState | null>('set/support/sort'),
  setMaintenanceSort: ActionCreator<MaintenanceSortState | null>('set/maintenance/sort'),
  setEstimateList: ActionCreator<EstimateListType[]>('set/estimate/list'),
  setFileList: ActionCreator<FileListType[]>('set/file/list'),
  setMaintenanceList: ActionCreator<MaintenanceList[]>('set/maintenance/list'),
  setSupportList: ActionCreator<SupportHistoryListType[]>('set/support/list'),
  setBillList: ActionCreator<BillListType[]>('set/bill/list'),
  resetState: ActionCreator('reset/state'),
};
