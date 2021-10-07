import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { MaintenanceActions } from './maintenance.action';
import { Maintenance, MaintenanceList, MaintenanceSortState } from '../../type/maintenance/maintenance.type';
import { MaintenanceCollection } from '../../collection/maintenance/maintenance.collection';

export type MaintenanceState = {
  maintenance: Maintenance | null;
  list: MaintenanceList[];
  sort: MaintenanceSortState;
};

const initialState: MaintenanceState = {
  maintenance: null,
  list: [],
  sort: MaintenanceCollection.initialSortState,
};

export const MaintenanceReducer = reducerWithInitialState<MaintenanceState>(initialState)
  .case(MaintenanceActions.setMaintenance, (state, payload) => ({
    ...state,
    maintenance: lodash.cloneDeep(payload),
  }))
  .case(MaintenanceActions.setList, (state, payload) => ({
    ...state,
    list: lodash.cloneDeep(payload),
  }))
  .case(MaintenanceActions.setSort, (state, payload) => ({
    ...state,
    sort: payload ? lodash.cloneDeep({
      ...state.sort,
      ...payload,
    }) : MaintenanceCollection.initialSortState,
  }))
  .case(MaintenanceActions.resetState, () => initialState)
  .default((state) => state);
