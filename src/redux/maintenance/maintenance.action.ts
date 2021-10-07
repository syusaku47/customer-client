import actionCreatorFactory from 'typescript-fsa';
import { Maintenance, MaintenanceList, MaintenanceSortState } from '../../type/maintenance/maintenance.type';
import { apiMaintenance } from './api/maintenance/api-maintenance';

const ActionCreator = actionCreatorFactory('maintenance');

export const MaintenanceActions = {
  api: {
    maintenance: apiMaintenance,
  },
  setMaintenance: ActionCreator<Maintenance | null>('set/maintenance'),
  setList: ActionCreator<MaintenanceList[]>('set/list'),
  setSort: ActionCreator<MaintenanceSortState | null>('set/sort'),
  resetState: ActionCreator('reset/state'),
};
