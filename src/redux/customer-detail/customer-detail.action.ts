// import {ApiLogin} from '../../api/auth/api-login';
import actionCreatorFactory from 'typescript-fsa';
import { ProjectListType, ProjectSortState } from '../../type/project/project.type';
import { FileSortState, FileListType } from '../../type/file/file.type';
import { SupportHistorySortState, SupportHistoryListType } from '../../type/support-history/support-history.type';
import { MaintenanceSortState, MaintenanceList } from '../../type/maintenance/maintenance.type';

const ActionCreator = actionCreatorFactory('customer/detail');

export const CustomerDetailActions = {
  setProjectSort: ActionCreator<ProjectSortState | null>('set/project/sort'),
  setSupportSort: ActionCreator<SupportHistorySortState | null>('set/support/sort'),
  setFileSort: ActionCreator<FileSortState | null>('set/file/sort'),
  setMaintenanceSort: ActionCreator<MaintenanceSortState | null>('set/maintenance/sort'),
  setProjectList: ActionCreator<ProjectListType[]>('set/project/list'),
  setFileList: ActionCreator<FileListType[]>('set/file/list'),
  setMaintenanceList: ActionCreator<MaintenanceList[]>('set/maintenance/list'),
  setSupportList: ActionCreator<SupportHistoryListType[]>('set/support/list'),
  resetState: ActionCreator('reset/state'),
};
