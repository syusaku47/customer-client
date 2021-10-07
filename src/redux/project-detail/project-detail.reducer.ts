import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { ProjectDetailActions } from './project-detail.action';
import { MaintenanceSortState, MaintenanceList } from '../../type/maintenance/maintenance.type';
import { FileSortState, FileListType } from '../../type/file/file.type';
import { SupportHistorySortState, SupportHistoryListType } from '../../type/support-history/support-history.type';
import { MaintenanceCollection } from '../../collection/maintenance/maintenance.collection';
import { FileCollection } from '../../collection/file/file.collection';
import { SupportHistoryCollection } from '../../collection/support-history/support-history.collection';
import { EstimateListType, EstimateSortState } from '../../type/estimate/estimate.type';
import { EstimateCollection } from '../../collection/estimate/estimatecollection';
import { BillListType, BillSortState } from '../../type/bill/bill.type';
import { BillCollection } from '../../collection/bill/bill.collection';

export type ProjectDetailState = {
  estimateSort: EstimateSortState;
  billSort: BillSortState;
  maintenanceSort: MaintenanceSortState;
  fileSort: FileSortState;
  supportSort: SupportHistorySortState;
  estimateList: EstimateListType[];
  fileList: FileListType[];
  maintenanceList: MaintenanceList[];
  supportList: SupportHistoryListType[];
  billList: BillListType[];
};

const initialState: ProjectDetailState = {
  estimateSort: EstimateCollection.sortInitialState,
  maintenanceSort: MaintenanceCollection.initialSortState,
  billSort: BillCollection.sortInitialState(),
  fileSort: FileCollection.initialSortState(),
  supportSort: SupportHistoryCollection.initialSortState(),
  estimateList: [],
  supportList: [],
  fileList: [],
  maintenanceList: [],
  billList: [],
};

export const ProjectDetailReducer = reducerWithInitialState<ProjectDetailState>(initialState)
  .case(ProjectDetailActions.setEstimateSort, (state, payload) => ({
    ...state,
    estimateSort: payload ? lodash.cloneDeep({
      ...state.estimateSort,
      ...payload,
    }) : EstimateCollection.sortInitialState,
  }))
  .case(ProjectDetailActions.setMaintenanceSort, (state, payload) => ({
    ...state,
    maintenanceSort: payload ? lodash.cloneDeep({
      ...state.maintenanceSort,
      ...payload,
    }) : MaintenanceCollection.initialSortState,
  }))
  .case(ProjectDetailActions.setFileSort, (state, payload) => ({
    ...state,
    fileSort: payload ? lodash.cloneDeep({
      ...state.fileSort,
      ...payload,
    }) : FileCollection.initialSortState(),
  }))
  .case(ProjectDetailActions.setSupportSort, (state, payload) => ({
    ...state,
    supportSort: payload ? lodash.cloneDeep({
      ...state.supportSort,
      ...payload,
    }) : SupportHistoryCollection.initialSortState(),
  }))
  .case(ProjectDetailActions.setEstimateList, (state, payload) => ({
    ...state,
    estimateList: lodash.cloneDeep(payload),
  }))
  .case(ProjectDetailActions.setMaintenanceList, (state, payload) => ({
    ...state,
    maintenanceList: lodash.cloneDeep(payload),
  }))
  .case(ProjectDetailActions.setFileList, (state, payload) => ({
    ...state,
    fileList: lodash.cloneDeep(payload),
  }))
  .case(ProjectDetailActions.setSupportList, (state, payload) => ({
    ...state,
    supportList: lodash.cloneDeep(payload),
  }))
  .case(ProjectDetailActions.resetState, () => initialState)
  .default((state) => state);
