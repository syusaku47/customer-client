import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { CustomerDetailActions } from './customer-detail.action';
import { MaintenanceSortState, MaintenanceList } from '../../type/maintenance/maintenance.type';
import { ProjectSortState, ProjectListType } from '../../type/project/project.type';
import { FileSortState, FileListType } from '../../type/file/file.type';
import { SupportHistorySortState, SupportHistoryListType } from '../../type/support-history/support-history.type';
import { ProjectCollection } from '../../collection/project/project.collection';
import { MaintenanceCollection } from '../../collection/maintenance/maintenance.collection';
import { FileCollection } from '../../collection/file/file.collection';
import { SupportHistoryCollection } from '../../collection/support-history/support-history.collection';

export type CustomerDetailState = {
  projectSort: ProjectSortState;
  maintenanceSort: MaintenanceSortState;
  fileSort: FileSortState;
  supportSort: SupportHistorySortState;
  projectList: ProjectListType[];
  fileList: FileListType[];
  maintenanceList: MaintenanceList[];
  supportList: SupportHistoryListType[];
};

const initialState: CustomerDetailState = {
  projectSort: ProjectCollection.initialSortState(),
  maintenanceSort: MaintenanceCollection.initialSortState,
  fileSort: FileCollection.initialSortState(),
  supportSort: { ...SupportHistoryCollection.initialSortState(), is_fixed: NaN },
  projectList: [],
  supportList: [],
  fileList: [],
  maintenanceList: [],
};

export const CustomerDetailReducer = reducerWithInitialState<CustomerDetailState>(initialState)
  .case(CustomerDetailActions.setProjectSort, (state, payload) => ({
    ...state,
    projectSort: payload ? lodash.cloneDeep({
      ...state.projectSort,
      ...payload,
    }) : ProjectCollection.initialSortState(),
  }))
  .case(CustomerDetailActions.setMaintenanceSort, (state, payload) => ({
    ...state,
    maintenanceSort: payload ? lodash.cloneDeep({
      ...state.maintenanceSort,
      ...payload,
    }) : MaintenanceCollection.initialSortState,
  }))
  .case(CustomerDetailActions.setFileSort, (state, payload) => ({
    ...state,
    fileSort: payload ? lodash.cloneDeep({
      ...state.fileSort,
      ...payload,
    }) : FileCollection.initialSortState(),
  }))
  .case(CustomerDetailActions.setSupportSort, (state, payload) => ({
    ...state,
    supportSort: payload ? lodash.cloneDeep({
      ...state.supportSort,
      ...payload,
    }) : { ...SupportHistoryCollection.initialSortState(), is_fixed: NaN },
  }))
  .case(CustomerDetailActions.setProjectList, (state, payload) => ({
    ...state,
    projectList: lodash.cloneDeep(payload),
  }))
  .case(CustomerDetailActions.setMaintenanceList, (state, payload) => ({
    ...state,
    maintenanceList: lodash.cloneDeep(payload),
  }))
  .case(CustomerDetailActions.setFileList, (state, payload) => ({
    ...state,
    fileList: lodash.cloneDeep(payload),
  }))
  .case(CustomerDetailActions.setSupportList, (state, payload) => ({
    ...state,
    supportList: lodash.cloneDeep(payload),
  }))
  .case(CustomerDetailActions.resetState, () => initialState)
  .default((state) => state);
